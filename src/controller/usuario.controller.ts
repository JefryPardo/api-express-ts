import { Request } from "express";
import { ResponseModel } from "../models/model/response.model";
import { UsuarioModel } from "../models/model/usuario.model";
import { _getUsuarioById, _insertUsuario, _updateEstadoUsuario, _updateUsuario } from "../query/usuario.query";
import { buildUsuario, validarCamposUsuario } from "../utils/validador.usuario";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";

const insertUsuario = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposUsuario(req.body);

    const rol: UsuarioModel = buildUsuario(req.body);

    return _insertUsuario(rol);
};

const getUsuarioById = async ( req: Request ) => {

    const idUsuario:string = req.params.id;

    if(esFormatoValido(idUsuario)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getUsuarioById(idUsuario);
};

const updateUsuarioById = async ( req: Request ) => {

    if(!req.body) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposUsuario(req.body);

    if(req.body.estado != 'activo' && req.body.estado  != 'inactivo') return new ResponseModel('#','Estado ingresado no valido.');

    return _updateUsuario(req.body.id,req.body);
};

const updateEstadoUsuarioById = async ( req: Request ) => {

    if(!req.body) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposUsuario(req.body);

    if(!req.body.estado || req.body.id) return new ResponseModel('#','Campos ingresados NO son validos');

    if(req.body.estado != 'activo' && req.body.estado  != 'inactivo') return new ResponseModel('#','Estado ingresado no valido.');

    return _updateEstadoUsuario(req.body.id,req.body.estado);
};

export { insertUsuario, getUsuarioById, updateUsuarioById, updateEstadoUsuarioById };