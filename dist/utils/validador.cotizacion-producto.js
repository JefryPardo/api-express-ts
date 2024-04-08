"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCotizacionProductoUpdate = exports.validarCamposCotizacionProductoUpdate = exports.validarCamposCotizacionProducto = exports.buildCotizacionProducto = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const cotizacion_producto_model_1 = require("../models/model/cotizacion-producto.model");
const cotizacion_producto_update_model_1 = require("../models/model/cotizacion.producto.update.model");
const response_model_1 = require("../models/model/response.model");
const buildCotizacionProducto = (data) => {
    try {
        let cotizacion_producto = new cotizacion_producto_model_1.CotizacionProductoModel();
        cotizacion_producto.cantidad = data.cantidad;
        cotizacion_producto.id_cotizacion = data.id_cotizacion;
        cotizacion_producto.id_producto = data.id_producto;
        return cotizacion_producto;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildCategoria: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildCotizacionProducto = buildCotizacionProducto;
const buildCotizacionProductoUpdate = (data) => {
    try {
        let cotizacion_producto_update = new cotizacion_producto_update_model_1.CotizacionProductoUpdateModel();
        cotizacion_producto_update.cantidad = data.cantidad;
        cotizacion_producto_update.id = data.id;
        return cotizacion_producto_update;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildCategoria: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildCotizacionProductoUpdate = buildCotizacionProductoUpdate;
const validarCamposCotizacionProducto = (cotizacionProductoBody) => {
    for (let index in cotizacionProductoBody) {
        if (index != "cantidad" &&
            index != "id_cotizacion" &&
            index != "id_producto") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposCotizacionProducto = validarCamposCotizacionProducto;
const validarCamposCotizacionProductoUpdate = (cotizacionProductoBody) => {
    for (let index in cotizacionProductoBody) {
        if (index != "cantidad" &&
            index != "id") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposCotizacionProductoUpdate = validarCamposCotizacionProductoUpdate;
