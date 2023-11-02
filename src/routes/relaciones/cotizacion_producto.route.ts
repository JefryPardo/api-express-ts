import { Router, Request, Response } from "express";
import { error, succes } from "../../network/response";
import { deleteCotizacionProductoById, getCategoriaProductoAll, insertCotizacionProducto, updateCategoriaProducto } from "../../controller/relacion/cotizacion_producto.controller";
import { _deleteCotizacionProductoById } from "../../query/relaciones/cotizacion_producto";

const routerCotizacionProducto = Router();

routerCotizacionProducto.post("/insert", (req: Request, res: Response) => {

    insertCotizacionProducto( req )
    .then(  _res    => succes(  req, res, _res))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacionProducto.get("/all/:id", (req: Request, res: Response) => {

    getCategoriaProductoAll( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacionProducto.delete("/delete/:id", (req: Request, res: Response) => {

    deleteCotizacionProductoById( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerCotizacionProducto.put("/update/:id", (req: Request, res: Response) => {

    updateCategoriaProducto( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

export {routerCotizacionProducto}