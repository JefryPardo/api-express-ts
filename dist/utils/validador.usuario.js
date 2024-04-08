"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposUsuario = exports.buildUsuario = void 0;
const usuario_model_1 = require("../models/model/usuario.model");
const logger_1 = require("../logs/logger");
const response_model_1 = require("../models/model/response.model");
const buildUsuario = (data) => {
    try {
        let usuario = new usuario_model_1.UsuarioModel();
        usuario.id = data.id;
        usuario.nombre = data.nombre;
        usuario.apellido = data.apellido;
        usuario.direccion = data.direccion;
        usuario.celular = data.celular;
        usuario.tipo_documento = data.tipo_documento;
        usuario.documento = data.documento;
        usuario.fecha_creacion = data.fecha_creacion;
        usuario.intentos_fallidos = data.intentos_fallidos;
        usuario.clave = data.clave;
        usuario.usuario = data.usuario;
        usuario.estado = data.estado;
        logger_1.logger.info(`Se genero el modelo de usuario: ${usuario.id} correctamente`);
        return usuario;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildUsuario: ${error}`);
        throw `Error inesperado, por favor comucnicar con el administrador. #V01`;
    }
};
exports.buildUsuario = buildUsuario;
const validarCamposUsuario = (usuario) => {
    for (let index in usuario) {
        if (index != "id" &&
            index != "nombre" &&
            index != "apellido" &&
            index != "direccion" &&
            index != "celular" &&
            index != "tipo_documento" &&
            index != "documento" &&
            index != "fecha_creacion" &&
            index != "intentos_fallidos" &&
            index != "clave" &&
            index != "usuario" &&
            index != "activo") {
            logger_1.logger.error(`Error en validarCamposUsuario: el siguiente campo no esta permitido ${index}`);
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposUsuario = validarCamposUsuario;
