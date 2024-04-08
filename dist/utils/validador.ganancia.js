"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposGanancia = exports.buildGanancia = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const ganancia_model_1 = require("../models/model/ganancia.model");
const response_model_1 = require("../models/model/response.model");
const buildGanancia = (data) => {
    try {
        let ganancia = new ganancia_model_1.GananciaModel();
        ganancia.id = data.id;
        ganancia.id_producto = data.id_categoria;
        ganancia.id_usuario = data.id_usuario;
        return ganancia;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildGanancia: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildGanancia = buildGanancia;
const validarCamposGanancia = (marcaBody) => {
    for (let index in marcaBody) {
        if (index != "id" &&
            index != "id_producto" &&
            index != "id_usuario") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposGanancia = validarCamposGanancia;
