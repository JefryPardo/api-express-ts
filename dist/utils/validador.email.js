"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDataEmail = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const cotizacion_historial_model_1 = require("../models/model/cotizacion-historial.model");
const buildDataEmail = (data) => {
    try {
        let emailData = new cotizacion_historial_model_1.CotizacionHistorialModel();
        emailData.correo = data.correo;
        emailData.cotizacion = data.cotizacion;
        emailData.descripcion = data.descripcion;
        emailData.detalle_de_obra = data.detalle_de_obra;
        emailData.mano_de_obra = data.mano_de_obra;
        emailData.producto_historial = data.producto_historial;
        emailData.referencia = data.referencia;
        emailData.version = data.version;
        return emailData;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildContizacion: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('EMAILEXCEPCION');
    }
};
exports.buildDataEmail = buildDataEmail;
