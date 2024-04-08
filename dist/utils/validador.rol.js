"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposRol = exports.buildRol = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const response_model_1 = require("../models/model/response.model");
const rol_model_1 = require("../models/model/rol.model");
const buildRol = (data) => {
    try {
        let rol = new rol_model_1.RolModel();
        rol.id = data.id;
        rol.rol = data.rol;
        rol.estado = data.estado;
        logger_1.logger.info(`Se genero el modelo de rol: ${rol.rol} correctamente`);
        return rol;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildRol: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildRol = buildRol;
const validarCamposRol = (rol) => {
    for (let index in rol) {
        if (index != "id" &&
            index != "rol" &&
            index != "estado") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposRol = validarCamposRol;
