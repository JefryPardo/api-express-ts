import { Router, Request, Response } from 'express';
import { getAllUsuarios, getInsertUsuario, getUsuarioById, getUsuarioByDocumento } from '../controller/usuario.controller';
import { usuarioModel } from '../models/usuario.model';
import { succes, error } from '../network/response';

const router = Router();

router.get("/all", ( req: Request, res: Response ) => {

    getAllUsuarios()
    .then( ( _res :usuarioModel[] ) => succes( req, res, _res ))
    .catch( (_error) => error( req, res, _error) );
});

router.post("/insert", (req: Request, res: Response) => {

    getInsertUsuario( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error => error(req, res, _error) );
});

router.get("/find/:id", (req: Request, res: Response) => {

    getUsuarioById( req )
    .then( _res => succes( req, res, _res ));
});

router.get("/find/documento/:documento", (req: Request, res: Response) => {

    getUsuarioByDocumento( req )
    .then( _res => succes( req, res, _res ));
});

export { router };