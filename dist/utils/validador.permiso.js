"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposPermiso = exports.buildPermiso = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const permiso_model_1 = require("../models/model/permiso.model");
const response_model_1 = require("../models/model/response.model");
const buildPermiso = (data) => {
    try {
        let permiso = new permiso_model_1.PermisoModel();
        permiso.id = data.id;
        permiso.permiso = data.permiso;
        permiso.estado = data.estado;
        logger_1.logger.info(`Se genero el modelo de permiso: ${permiso.permiso} correctamente`);
        return permiso;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildPermiso: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildPermiso = buildPermiso;
const validarCamposPermiso = (permiso) => {
    for (let index in permiso) {
        if (index != "id" &&
            index != "permiso" &&
            index != "estado") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposPermiso = validarCamposPermiso;
