import { Router, Request, Response } from "express";
import { succes, error } from "../network/response";
import { deleteCotizacion, getCotizacionesById, getCotizacionesByIdUsuario, insertCotizacion, updateCotizacion } from "../controller/cotizacion.controller";

const routerCotizacion = Router();

routerCotizacion.post("/insert", (req: Request, res: Response) => {

    insertCotizacion( req )
    .then(  _res    => succes(  req, res, _res))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacion.get("/all/by/usuario/:id", (req: Request, res: Response) => {

    getCotizacionesByIdUsuario( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacion.get("/find/:id", (req: Request, res: Response) => {

    getCotizacionesById( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacion.post("/update", (req: Request, res: Response) => {

    updateCotizacion( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacion.delete("/delete/:idcotizacion", (req: Request, res: Response) => {

    deleteCotizacion( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

export {routerCotizacion}