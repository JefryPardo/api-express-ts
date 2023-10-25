import { Router, Request, Response } from "express";
import { succes, error } from "../network/response";
import { getCotizacionesByIdUsuario, insertCotizacion, updateCotizacion } from "../controller/cotizacion.controller";

const routerCotizacion = Router();

routerCotizacion.post("/insert", (req: Request, res: Response) => {

    insertCotizacion( req )
    .then(  _res    => succes(  req, res, _res))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacion.get("/all/by/usuario", (req: Request, res: Response) => {

    getCotizacionesByIdUsuario( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacion.get("/update", (req: Request, res: Response) => {

    updateCotizacion( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});