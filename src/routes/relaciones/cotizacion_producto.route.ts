import { Router, Request, Response } from "express";
import { succes, error } from "../network/response";

const routerCotizacionProducto = Router();

routerCotizacionProducto.post("/insert", (req: Request, res: Response) => {

    insertCotizacion( req )
    .then(  _res    => succes(  req, res, _res))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacionProducto.get("/all/by/usuario", (req: Request, res: Response) => {

    getCotizacionesByIdUsuario( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacionProducto.get("/update", (req: Request, res: Response) => {

    updateCotizacion( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});