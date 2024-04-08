"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposTipo = exports.buildTipo = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const response_model_1 = require("../models/model/response.model");
const tipo_model_1 = require("../models/model/tipo.model");
const buildTipo = (data) => {
    try {
        let tipo = new tipo_model_1.TipoModel();
        tipo.id = data.id;
        tipo.tipo = data.tipo;
        logger_1.logger.info(`Se genero el modelo de tipo: ${tipo.tipo} correctamente`);
        return tipo;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildTipo: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildTipo = buildTipo;
const validarCamposTipo = (tipoBuild) => {
    for (let index in tipoBuild) {
        if (index != "id" &&
            index != "tipo") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposTipo = validarCamposTipo;
