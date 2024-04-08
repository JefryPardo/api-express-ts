"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposCategoria = exports.buildCategoria = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const categoria_model_1 = require("../models/model/categoria.model");
const response_model_1 = require("../models/model/response.model");
const buildCategoria = (data) => {
    try {
        let categoria = new categoria_model_1.CategoriaModel();
        categoria.id = data.id;
        categoria.categoria = data.categoria;
        return categoria;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildCategoria: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildCategoria = buildCategoria;
const validarCamposCategoria = (cotizacionBody) => {
    for (let index in cotizacionBody) {
        if (index != "id" &&
            index != "nombre_cliente" &&
            index != "cedula_cliente" &&
            index != "correo_cliente" &&
            index != "fecha_creacion" &&
            index != "fecha_vencimiento" &&
            index != "id_usuario") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposCategoria = validarCamposCategoria;
