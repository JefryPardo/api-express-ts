import { Request } from "express";
import { logger } from "../logs/logger";
import { RolModel } from "../models/model/rol.model";
import { _insertRol } from "../query/rol.query";
import { buildRol, validarCamposRol } from "../utils/validador.rol";

const insertRol = async ( req: Request ) => {

    if(!req.body) {

        logger.error(`Error en insertRol: campos de entrada no validos: ${req.body}`)
        throw 'Se requiere un campo valido.'
    }

    validarCamposRol(req.body);

    const rol: RolModel = buildRol(req.body);

    return _insertRol(rol);
};



export { insertRol };