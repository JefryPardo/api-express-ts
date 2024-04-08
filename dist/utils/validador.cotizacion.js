"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposCotizacion = exports.buildCotizacion = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const cotizacion_model_1 = require("../models/model/cotizacion.model");
const response_model_1 = require("../models/model/response.model");
const buildCotizacion = (data) => {
    try {
        let cotizacion = new cotizacion_model_1.CotizacionModel();
        cotizacion.nombre = data.nombre;
        cotizacion.nombre_cliente = data.nombre_cliente;
        cotizacion.cedula_cliente = data.cedula_cliente;
        cotizacion.correo_cliente = data.correo_cliente;
        cotizacion.fecha_vencimiento = data.fecha_vencimiento;
        cotizacion.id_usuario = data.id_usuario;
        return cotizacion;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildContizacion: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildCotizacion = buildCotizacion;
const validarCamposCotizacion = (cotizacionBody) => {
    for (let index in cotizacionBody) {
        if (index != "nombre" &&
            index != "nombre_cliente" &&
            index != "cedula_cliente" &&
            index != "correo_cliente" &&
            index != "fecha_vencimiento" &&
            index != "id_usuario") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposCotizacion = validarCamposCotizacion;
