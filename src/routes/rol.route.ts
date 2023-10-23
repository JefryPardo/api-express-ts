import { Router, Request, Response } from "express";
import { getAllRol, insertRol } from "../controller/rol.controller";
import { succes, error } from "../network/response";

const routerRol = Router();

routerRol.post("/insert", (req: Request, res: Response) => {

    insertRol( req )
    .then(  _res    => succes(  req, res, _res))
    .catch( _error  => error(   req, res, _error));
});

routerRol.get("/all", (req: Request, res: Response) => {

    getAllRol()
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

// routerRol.get("/find/:id", (req: Request, res: Response) => {

//     getRolById( req )
//     .then( _res => succes( req, res, _res ))
//     .catch( _error  => error(   req, res, _error));
// });

export { routerRol };