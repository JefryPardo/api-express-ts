import { Router } from "express";
import { transporter } from "../../service/sendmail.service";

const routerMail = Router();

const facturaHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Factura</title>
</head>
<body>
    <h1>Factura</h1>
    <table>
        <thead>
            <tr>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Producto 1</td>
                <td>2</td>
                <td>$10.00</td>
                <td>$20.00</td>
            </tr>
            <tr>
                <td>Producto 2</td>
                <td>3</td>
                <td>$15.00</td>
                <td>$45.00</td>
            </tr>
            <tr>
                <td>Producto 3</td>
                <td>1</td>
                <td>$30.00</td>
                <td>$30.00</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Total:</td>
                <td>$95.00</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>
`;

routerMail.get('/enviar-correo', (req, res) => {
    
    const mailOptions = {
      from: 'tucompraheroku@gmail.com',
      to: 'jeffryjhoan1996@gmail.com',
      subject: 'Cotización',
      html: facturaHTML,
    };
  
    transporter.sendMail(mailOptions, (error:any, info:any) => {
      
        if (error) {
        console.error('Error al enviar el correo: ' + error);
        res.send('Error al enviar el correo');
      } else {
        console.log('Correo enviado: ' + info.response);
        res.send('Correo enviado con éxito');
      }
    });
});

export {routerMail}