import { Router, Request, Response } from "express";
import { insertRol } from "../controller/rol.controller";
import { succes, error } from "../network/response";

const routerRol = Router();

routerRol.post("/insert", (req: Request, res: Response) => {

    insertRol( req )
    .then(  _res    => {
        succes(  req, res, _res)
    })
    .catch( _error  => error(   req, res, _error));
});

export { routerRol };