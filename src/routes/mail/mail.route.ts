import { Router } from "express";
import { enviarCorreo } from "../../controller/email.controller";
import { succes,error } from "../../network/response";
const routerMail = Router();


routerMail.post('/enviar-correo', (req: any, res) => {
    
  enviarCorreo( req )
  .then(  _res    => succes(  req, res, _res))
  .catch( _error  => error(   req, res, _error));
});


export {routerMail}