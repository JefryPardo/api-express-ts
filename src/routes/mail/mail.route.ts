import { Router } from "express";
import { transporter } from "../../service/sendmail.service";
import { getPlantilla } from "./plantilla";

const routerMail = Router();





routerMail.get('/enviar-correo', (req, res) => {
    
    const mailOptions = {
      from: 'pardo0alzate@gmail.com',
      to: 'jeffry.pardo01@unicatolica.edu.co',
      subject: 'Cotización',
      html: getPlantilla(),
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