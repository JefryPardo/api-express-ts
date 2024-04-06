import { logger } from "../logs/logger";
import { transporter } from "../service/sendmail.service";
import { validarToken } from "./jwt.controlle";
import { Request } from "express";

const enviarCorreo = async ( req: Request ) => {

    // await validarToken(req);

    let html = req.body.html;
    logger.info(`req.body.html: ${req.body.html}`);

    const mailOptions = {
      from: 'pardo0alzate@gmail.com',
      to: 'jeffry.pardo01@unicatolica.edu.co',
      subject: 'Cotización',
      html: html,
    };
  
    transporter.sendMail(mailOptions, (error:any, info:any) => {
      
        if (error) {
        console.error('Error al enviar el correo: ' + error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
};

export { 
  enviarCorreo, 
};