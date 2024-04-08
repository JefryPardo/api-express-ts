"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposUsuarioRol = exports.buildUsuarioRol = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const response_model_1 = require("../models/model/response.model");
const usuario_rol_model_1 = require("../models/model/usuario-rol.model");
const buildUsuarioRol = (data) => {
    try {
        let usuario_rol = new usuario_rol_model_1.UsuarioRolModel();
        usuario_rol.id = data.id;
        usuario_rol.id_rol = data.id_rol;
        usuario_rol.id_usuario = data.id_usuario;
        return usuario_rol;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildUsuarioRol: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildUsuarioRol = buildUsuarioRol;
const validarCamposUsuarioRol = (usuarioRolBody) => {
    for (let index in usuarioRolBody) {
        if (index != "id" &&
            index != "id_rol" &&
            index != "id_usuario") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposUsuarioRol = validarCamposUsuarioRol;
