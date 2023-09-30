import { Request } from "express";
import { logger } from "../logs/logger";
import { RolModel } from "../models/model/rol.model";
import { _getAllRols, _getRolById, _insertRol, _updateEstadoRolById } from "../query/rol.query";
import { buildRol, validarCamposRol } from "../utils/validador.rol";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";
import { ResponseModel } from "../models/model/response.model";

const insertRol = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#IRF01','Data ingresada no validad.');
    }

    validarCamposRol(req.body);

    const rol: RolModel = buildRol(req.body);

    return _insertRol(rol);
};

const getAllRol = async () => {return _getAllRols()};

const getRolById = async ( req: Request ) => {

    const idRol:string = req.params.id;

    if(esFormatoValido(idRol)) throw NewExcepcion('IDNOVALIDOEXCEPCION');
    return _getRolById(idRol);
};

const updateEstadoRolById = async ( req: Request ) => {

    if(!req.body) {

        logger.error(`Error en updateEstadoRolById: campos de entrada no validos: ${req.body}`)
        throw 'Se requiere un campo valido.'
    }

    validarCamposRol(req.body);
    if(!req.body.estado || req.body.id) return new ResponseModel('#UR03','Campos ingresados NO son validos');
    return _updateEstadoRolById(req.body.id,req.body.estado);
};

export { insertRol, getAllRol, getRolById, updateEstadoRolById };