import { NewExcepcion } from "../excepcion/excepcion";
import { ResponseModel } from "../models/model/response.model";
import { _getPermisoById, _insertPermiso, _updateEstadoPermiso } from "../query/permiso.query";
import { esFormatoValido } from "../utils/validador";
import { Request } from "express";
import { buildPermiso, validarCamposPermiso } from "../utils/validador.permiso";
import { PermisoModel } from "../models/model/permiso.model";

const insertPermiso = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#IPF01','Data ingresada no validad.');
    }

    validarCamposPermiso(req.body);

    const permiso: PermisoModel = buildPermiso(req.body);

    return _insertPermiso(permiso);
};

const getPermisoById = async ( req: Request ) => {

    const idPermiso:string = req.params.id;

    if(esFormatoValido(idPermiso)) throw NewExcepcion('IDNOVALIDOEXCEPCION');
    return _getPermisoById(idPermiso);
};

const updateEstadoPermisoById = async ( req: Request ) => {

    if(!req.body) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposPermiso(req.body);

    if(!req.body.estado || req.body.id) return new ResponseModel('#','Campos ingresados NO son validos');

    return _updateEstadoPermiso(req.body.id,req.body.estado);
};

export { insertPermiso, getPermisoById, updateEstadoPermisoById };