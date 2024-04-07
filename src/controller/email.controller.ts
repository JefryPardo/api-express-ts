import { logger } from "../logs/logger";
import { CotizacionHistorialModel } from "../models/model/cotizacion-historial.model";
import { ProductoModel } from "../models/model/producto.model";
import { ResumenProductoModel } from "../models/model/resumen-producto.model";
import { generarpdf, transporter } from "../service/sendmail.service";
import { buildDataEmail } from "../utils/validador.email";
import { validarToken } from "./jwt.controlle";
import { Request } from "express";

const enviarCorreo = async ( req: Request ) => {

  await validarToken(req);
  let productosPorTipo: { [tipo: string]: ProductoModel[] } = {};

  let data: CotizacionHistorialModel = buildDataEmail(req.body);

  if(validarEmailFormato(data.correo)) {

    logger.error(`correo no valido`);
    return;
  }

  const email = data.correo;

  for (const info of data.producto_historial) {
    const tipo = info.producto.tipo;

    if (!productosPorTipo[tipo]) {
      productosPorTipo[tipo] = [];
    }

    productosPorTipo[tipo].push(info.producto);
  }

  let tiposDeProducto: string[] = [];
  tiposDeProducto = Object.keys(productosPorTipo);

  const html = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        font-size: 24px;
                        font-weight: bold;
                    }
                    h2 {
                        font-size: 20px;
                        font-weight: bold;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1>Referencia: ${data.referencia}</h1>
                    <h2>Versión: ${data.version}</h2>
                    <div>Generado: ${obtenerFechaConFormato()}</div>
                    <div>${data.cotizacion.nombre}</div>
                    <div>${data.descripcion}</div>
                    
                    ${
                        tiposDeProducto.map(tipo => `
                            <div>
                                <h2>${tipo}</h2>
                                <table>
                                    <tr>
                                        <th>Cant.</th>
                                        <th>Nombre</th>
                                        <th>Ref.</th>
                                        <th>Vl. Unit.</th>
                                        <th>Vl. Tot.</th>
                                    </tr>
                                    ${
                                        data.producto_historial.filter(product => product.producto.tipo === tipo).map(product => `
                                            <tr>
                                                <td>${product.cantidad}</td>
                                                <td>${product.producto.nombre}</td>
                                                <td>${product.producto.referencia}</td>
                                                <td>${product.producto.precio}</td>
                                                <td>${calcularTotal(product.cantidad, product.producto.precio)}</td>
                                            </tr>
                                        `).join('')
                                    }
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>subtotal:</td>
                                        <td>${calcularTotalPorTipo(tipo, data.producto_historial)}</td>
                                    </tr>
                                </table>
                            </div>
                        `).join('')
                    }
                    <div>
                        <h2>Mano de obra</h2>
                        <table>
                            <tr>
                                <th>Detalle.</th>
                                <th>Vl. Tot.</th>
                            </tr>
                            <tr>
                                <td>${evaluarDetalleManoDeObra(data.detalle_de_obra)}</td>
                                <td>${evaluarValueManoDeObra(data.mano_de_obra)}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <h2>Resumen</h2>
                        <table>
                            <tr>
                                <th>Detalle.</th>
                                <th>Vl. Tot.</th>
                            </tr>
                            ${
                                tiposDeProducto.map(tipo => `
                                    <tr>
                                        <td>${tipo}</td>
                                        <td>${calcularTotalPorTipo(tipo, data.producto_historial)}</td>
                                    </tr>
                                `).join('')
                            }
                            <tr>
                                <td>obra de mano</td>
                                <td>${evaluarValueManoDeObra(data.mano_de_obra)}</td>
                            </tr>
                            <tr>
                                <td>Total:</td>
                                <td>${calcularTotalCotizacion(data.producto_historial, data.mano_de_obra)}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    `;

  await generarpdf(html, (err:any, pdfBuffer:any) => {
    if (err) {
      console.error('Error al generar el PDF: ' + err);
      return;
    }

    const mailOptions = {
      from: 'cotizacion.generada@gmail.com',
      to: email,
      subject: 'Cotización',
      html: html,
      attachments: [{
        filename: 'cotizacion.pdf',
        content: pdfBuffer,
      }],
    };

    transporter.sendMail(mailOptions, (error:any, info:any) => {
      if (error) {
        console.error('Error al enviar el correo: ' + error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
  });
  // const pdfBytes = await generarpdf(html);

  // const mailOptions = {
  //   from: 'pardo0alzate@gmail.com',
  //   to: email,
  //   subject: 'Cotización',
  //   html: html,
  //   attachments: [{
  //     filename: 'cotizacion.pdf',
  //     content: pdfBytes,
  //   }],
  // };

  // transporter.sendMail(mailOptions, (error:any, info:any) => {
    
  //   if (error) {
  //     console.error('Error al enviar el correo: ' + error);
  //   } else {
  //     console.log('Correo enviado: ' + info.response);
  //   }
  // });
};

const validarEmailFormato = ( email: any ): boolean => {

  if(
    email == null       || 
    email == undefined  || 
    email == ''         || 
    email.length == 0    
  ) {

    return true;
  }

  return false;
}

const obtenerFechaConFormato = (): string => {

  const fecha = new Date();
    
  const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', options);
}

const calcularTotal = (cantidad:string, precio:number): number => {

  const cantidadNumerica = parseFloat(cantidad);

  if (!isNaN(cantidadNumerica)) {
    return cantidadNumerica * precio;
  } else {
    return 0;
  }
}

const calcularTotalPorTipo = (tipo: string, producto_historial  : ResumenProductoModel[]): number => {

  let totalPrecio = 0;
  for (const data of producto_historial) {
    if (data.producto.tipo === tipo) {
      const cantidadNumerica = parseFloat(data.cantidad);
      totalPrecio = totalPrecio + cantidadNumerica * data.producto.precio;
    }
  }
    
  return totalPrecio;
}

const evaluarDetalleManoDeObra = (detalle_de_obra     : string): string => {

  if(detalle_de_obra == null || detalle_de_obra == undefined || detalle_de_obra.length == 0) {
      
    detalle_de_obra = 'Sin detalles';
  };

  return detalle_de_obra;
}

const evaluarValueManoDeObra = (mano_de_obra        : number): number => {

  if(mano_de_obra == null || mano_de_obra == undefined || mano_de_obra < 0) {
      
    mano_de_obra = 0;
  };

  return mano_de_obra;
}

const calcularTotalCotizacion = (producto_historial  : ResumenProductoModel[], mano_de_obra : number): number => {

  let valor = 0;

  producto_historial.forEach(data => {
    
    valor = valor + calcularTotalPorTipo(data.producto.tipo, producto_historial);
  });

  valor = valor + mano_de_obra;

  return valor;
}

export { 
  enviarCorreo, 
};