import { Request } from "express";
import { ResponseModel } from "../models/model/response.model";
import { UsuarioModel } from "../models/model/usuario.model";
import { _getDisponibilidadUsuarioByUsuario, _getUsuarioById, _getUsuarioByUsuario, _insertUsuario, _updateEstadoUsuario, _updateUsuario } from "../query/usuario.query";
import { validarCamposUsuario } from "../utils/validador.usuario";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { validarToken } from "./jwt.controlle";

const insertUsuario = async ( usuario: UsuarioModel ) => {

    return _insertUsuario(usuario);
};

const getUsuarioById = async ( req: Request ) => {

    await validarToken(req);

    const idUsuario:string = req.params.id;

    if(esFormatoValido(idUsuario)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getUsuarioById(idUsuario);
};

const getUsuarioByUsuario = async ( usuario:string ) => {

    return _getUsuarioByUsuario(usuario);
};

const getUsuarioByUsuarioRequest = async ( req: Request ) => {

    await validarToken(req);

    const usuario:string = req.params.usuario;

    return _getUsuarioByUsuario(usuario);
};

const validarDisponibilidadUsuario = async ( usuario: string ) => {

    try {

        return await _getDisponibilidadUsuarioByUsuario(usuario);        
    
    } catch (error) {

        logger.error('Error al validar disponibilidad del usuario:', error);
        throw NewExcepcion('USUARIOEXCEPCION','validarDisponibilidadUsuario');
    }
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

export { 
    insertUsuario, 
    getUsuarioById, 
    updateUsuarioById, 
    updateEstadoUsuarioById, 
    validarDisponibilidadUsuario,
    getUsuarioByUsuario,
    getUsuarioByUsuarioRequest
};