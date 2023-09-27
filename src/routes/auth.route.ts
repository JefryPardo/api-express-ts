import { Router, Request, Response } from 'express';
import { _getAllRols } from '../controller/login.controller';
import { succes, error } from '../network/response';
import { RolModel } from '../models/model/rol.model';

const routerAuth = Router();

routerAuth.get("/all/rol", ( req: Request, res: Response ) => {

    _getAllRols()
    .then( ( _res :RolModel[] ) => succes( req, res, _res ))
    .catch( (_error) => error( req, res, _error) );
});

export { routerAuth };