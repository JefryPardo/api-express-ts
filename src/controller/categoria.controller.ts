import { Request } from "express";
import { _getAllCategoria, _getCategoriaById, _insertCategoria, _updateCategoria } from "../query/categoria.query";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";
import { ResponseModel } from "../models/model/response.model";
import { buildCategoria, validarCamposCategoria } from "../utils/validador.categoria";
import { CategoriaModel } from "../models/model/categoria.model";

const insertCategoria = async ( req: Request ) => {

    const categoria:string = req.params.categoria;

    return _insertCategoria(categoria);
};

const getAllCategoria = async () => {return _getAllCategoria()};

const getCategoriaById = async ( req: Request ) => {

    const idCategoria:string = req.params.id;

    if(esFormatoValido(idCategoria)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getCategoriaById(idCategoria);
};

const updateCategoriaById = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCategoria(req.body);

    const categoria: CategoriaModel = buildCategoria(req.body);

    return _updateCategoria(categoria);
};

export { insertCategoria, getAllCategoria, getCategoriaById, updateCategoriaById };