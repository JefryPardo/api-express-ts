import { Router, Request, Response } from "express";
import { succes, error } from "../network/response";
import { getAllProductos } from "../controller/producto.controller";

const routerProducto = Router();

routerProducto.get("/public/all", (req: Request, res: Response) => {

    getAllProductos()
    .then( _res => succes( req, res, _res ))
    .catch( _error  => error(   req, res, _error));
});