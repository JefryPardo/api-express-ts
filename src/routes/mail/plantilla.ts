import { PlantillaModel } from "../../models/model/plantilla.model";


const getPlantilla = ():string => {

    let titulo = 'Cristaleria la 40';

    const instancia1 = new PlantillaModel();
    instancia1.nombre = 'Producto 1';
    instancia1.cantidad = 2;
    instancia1.precio = 10.00;
    instancia1.fecha_vencimiento = '2023-12-31';

    const instancia2 = new PlantillaModel();
    instancia2.nombre = 'Producto 2';
    instancia2.cantidad = 3;
    instancia2.precio = 15.00;
    instancia2.fecha_vencimiento = '2024-06-30';

    const instancia3 = new PlantillaModel();
    instancia3.nombre = 'Producto 3';
    instancia3.cantidad = 1;
    instancia3.precio = 30.00;
    instancia3.fecha_vencimiento = '2024-04-15';

    const instancia4 = new PlantillaModel();
    instancia4.nombre = 'Producto 4';
    instancia4.cantidad = 4;
    instancia4.precio = 12.50;
    instancia4.fecha_vencimiento = '2024-09-20';

    const arrayDePlantillas: PlantillaModel[] = [instancia1, instancia2, instancia3, instancia4];

    const filasHTML = arrayDePlantillas.map((plantilla) => `
        <tr>
            <td>${plantilla.nombre}</td>
            <td>${plantilla.cantidad}</td>
            <td>$${plantilla.precio.toFixed(2)}</td>
            <td>$${(plantilla.cantidad * plantilla.precio).toFixed(2)}</td>
        </tr>
    `).join('');

    const total = arrayDePlantillas.reduce((acc, plantilla) => acc + plantilla.cantidad * plantilla.precio, 0);

    const estilosCSS = `
        <style>
            /* Define los estilos para la tabla y el encabezado */
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #f2f2f2;
            }

            /* Define los estilos para el encabezado con la imagen */
            .encabezado {
                text-align: center;
                padding: 20px;
            }
            .banner {
                max-width: 100%;
                max-height: 200px;
            }
        </style>
    `;

    const facturaHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Factura</title>
            ${estilosCSS}
        </head>
        <body>
            <div class="encabezado">
                <img class="banner" src="https://raw.githubusercontent.com/JefryPardo/tesis-img/master/logo.png" alt="Banner">
                <h3>Cotización: ${titulo}</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio por unidad</th>
                        <th>Precio total</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasHTML}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Total:</td>
                        <td>$${total.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </body>
        </html>
        `;

    return facturaHTML;
};

export {getPlantilla}