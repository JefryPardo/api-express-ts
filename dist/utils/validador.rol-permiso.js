"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposRolPermiso = exports.buildRolPermiso = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const response_model_1 = require("../models/model/response.model");
const rol_permiso_model_1 = require("../models/model/rol-permiso.model");
const buildRolPermiso = (data) => {
    try {
        let rol_permiso = new rol_permiso_model_1.RolPermisoModel();
        rol_permiso.id = data.id;
        rol_permiso.id_permiso = data.id_permiso;
        rol_permiso.id_rol = data.id_rol;
        return rol_permiso;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildRolPermiso: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildRolPermiso = buildRolPermiso;
const validarCamposRolPermiso = (rolPermisoBody) => {
    for (let index in rolPermisoBody) {
        if (index != "id" &&
            index != "id_permiso" &&
            index != "id_rol") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposRolPermiso = validarCamposRolPermiso;
