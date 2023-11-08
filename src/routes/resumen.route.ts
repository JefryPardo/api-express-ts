import { Router, Request, Response } from "express";
import { succes, error } from "../network/response";
import { getResumen } from "../controller/resumen.controller";

const routerResumen = Router();

routerResumen.get("/find/:id", (req: Request, res: Response) => {

    getResumen( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

export {routerResumen}