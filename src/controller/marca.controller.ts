import { Request } from "express";
import { _getAllMarca, _getMarcaById, _insertMarca, _updateMarca } from "../query/marca.query";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";
import { ResponseModel } from "../models/model/response.model";
import { buildMarca, validarCamposMarca } from "../utils/validador.marca";
import { MarcaModel } from "../models/model/marca.model";

const insertMarca = async ( req: Request ) => {

    const marca:string = req.params.marca;

    return _insertMarca(marca);
};

const getAllMarca = async () => {return _getAllMarca()};

const getMarcaById = async ( req: Request ) => {

    const idMarca:string = req.params.id;

    if(esFormatoValido(idMarca)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getMarcaById(idMarca);
};

const updateMarcaById = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposMarca(req.body);

    const rol: MarcaModel = buildMarca(req.body);

    return _updateMarca(req.body.id,req.body.marca);
};

export { insertMarca, getAllMarca, getMarcaById, updateMarcaById };