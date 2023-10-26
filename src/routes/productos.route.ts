import { Router, Request, Response } from "express";
import { succes, error } from "../network/response";
import { getAllProductos, getAllPublicProductos, getProductoById } from "../controller/producto.controller";
import { _getProductoById } from "../query/producto.query";

const routerProducto = Router();

routerProducto.get("/public/all", (req: Request, res: Response) => {

    getAllPublicProductos()
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerProducto.get("/all", (req: Request, res: Response) => {

    getAllProductos( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

routerProducto.get("/find/:id", (req: Request, res: Response) => {

    getProductoById( req )
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});

export { routerProducto };