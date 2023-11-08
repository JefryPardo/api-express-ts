import { Request } from "express";
import { validarToken } from "./jwt.controlle";
import { ResponseModel } from "../models/model/response.model";
import { buildProducto, validarCamposProducto } from "../utils/validador.producto";
import { ProductoModel } from "../models/model/producto.model";
import { _getAllProductos, _getProductoById, _insertProducto, _updateEstadoProducto, _updateProducto } from "../query/producto.query";

const insertProducto = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposProducto(req.body);

    const rol: ProductoModel = buildProducto(req.body);

    return _insertProducto(rol);
};

const getProductoById = async ( req: Request ) => {

    const idProducto:string = req.params.id;

    const producto: ProductoModel = await _getProductoById(idProducto);

    return new ResponseModel(
        '#SP', 
        producto
    );
};

const updateProductoById = async ( req: Request ) => {

    if(Object.keys(req.body).length === 0) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposProducto(req.body);

    if(req.body.estado != 'activo' && req.body.estado  != 'inactivo') return new ResponseModel('#','Estado ingresado no valido.');

    return _updateProducto(req.body.id,req.body);
};

const updateEstadoProductoById = async ( req: Request ) => {

    if(!req.body) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposProducto(req.body);

    if(!req.body.estado || req.body.id) return new ResponseModel('#','Campos ingresados NO son validos');

    if(req.body.estado != 'activo' && req.body.estado  != 'inactivo') return new ResponseModel('#','Estado ingresado no valido.');

    return _updateEstadoProducto(req.body.id,req.body.estado);
};

const getAllPublicProductos = async () => {

    const productos: ProductoModel[] = await _getAllProductos();

    return new ResponseModel(
        '#SP', 
        productos
    );
};

const getAllProductos = async ( req: Request ) => {

    await validarToken(req);

    const productos: ProductoModel[] = await _getAllProductos();

    return new ResponseModel(
        '#SP', 
        productos
    );
};

export { 
    insertProducto, 
    getProductoById, 
    updateProductoById, 
    updateEstadoProductoById,
    getAllProductos,
    getAllPublicProductos
};