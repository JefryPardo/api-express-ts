import { Request } from "express";
import { _getAllTipo, _getTipoById, _insertTipo, _updateTipoById } from "../query/tipo.query";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";
import { ResponseModel } from "../models/model/response.model";
import { buildTipo, validarCamposTipo } from "../utils/validador.tipo";
import { TipoModel } from "../models/model/tipo.model";

const insertTipo = async ( req: Request ) => {

    const tipo:string = req.params.tipo;

    return _insertTipo(tipo);
};

const getAllTipo = async () => {return _getAllTipo()};

const getTipoById = async ( req: Request ) => {

    const idTipo:string = req.params.id;

    if(esFormatoValido(idTipo)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getTipoById(idTipo);
};

const updateTipoById = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposTipo(req.body);

    const tipo: TipoModel = buildTipo(req.body);

    return _updateTipoById(tipo);
};

export { insertTipo, getAllTipo, getTipoById, updateTipoById };