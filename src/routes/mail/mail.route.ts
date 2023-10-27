import { Router } from "express";
import { transporter } from "../../service/sendmail.service";

const routerMail = Router();

routerMail.get('/enviar-correo', (req, res) => {
    
    const mailOptions = {
      from: 'tucompraheroku@gmail.com',
      to: 'jeffryjhoan1996@gmail.com',
      subject: 'Asunto del correo',
      text: 'Contenido del correo',
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