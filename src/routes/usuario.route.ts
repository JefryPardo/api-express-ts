import { Router, Request, Response } from 'express';
import { succes, error } from '../network/response';
import { getUsuarioById, getUsuarioByUsuarioRequest, insertUsuario } from '../controller/usuario.controller';

const usuarioRouter = Router();


usuarioRouter.get("/find/:id", (req: Request, res: Response) => {

    getUsuarioById( req )
    .then( _res => succes( req, res, _res ));
});

usuarioRouter.get("/find/usuario/:usuario", (req: Request, res: Response) => {

    getUsuarioByUsuarioRequest( req )
    .then( _res => succes( req, res, _res ));
});

export { usuarioRouter };