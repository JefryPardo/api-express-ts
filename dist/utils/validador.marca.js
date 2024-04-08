"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposMarca = exports.buildMarca = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const marca_model_1 = require("../models/model/marca.model");
const response_model_1 = require("../models/model/response.model");
const buildMarca = (data) => {
    try {
        let marca = new marca_model_1.MarcaModel();
        marca.id = data.id;
        marca.marca = data.marca;
        logger_1.logger.info(`Se genero el modelo marca: ${marca.marca} correctamente`);
        return marca;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildMarca: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildMarca = buildMarca;
const validarCamposMarca = (marcaBody) => {
    for (let index in marcaBody) {
        if (index != "id" &&
            index != "marca") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposMarca = validarCamposMarca;
