"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposProducto = exports.buildProducto = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const producto_model_1 = require("../models/model/producto.model");
const response_model_1 = require("../models/model/response.model");
const buildProducto = (data) => {
    try {
        let producto = new producto_model_1.ProductoModel();
        producto.id = data.id;
        producto.nombre = data.nombre;
        producto.descripcion = data.descripcion;
        producto.url_imagen = data.url_imagen;
        producto.referencia = data.referencia;
        producto.referencia_local = data.referencia_local;
        producto.precio = data.precio;
        producto.ficha_tecnica = data.ficha_tecnica;
        producto.unidades = data.unidades;
        producto.estado = data.estado;
        producto.categoria = data.categoria;
        producto.tipo = data.tipo;
        producto.marca = data.marca;
        return producto;
    }
    catch (error) {
        logger_1.logger.error(`Error en buildProducto: ${error}`);
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildProducto = buildProducto;
const validarCamposProducto = (productoBody) => {
    for (let index in productoBody) {
        if (index != "id" &&
            index != "nombre" &&
            index != "precio" &&
            index != "referencia" &&
            index != "referencia_local" &&
            index != "unidades" &&
            index != "url_imagen" &&
            index != "descripcion" &&
            index != "ficha_tecnica" &&
            index != "estado" &&
            index != "categoria" &&
            index != "marca" &&
            index != "tipo") {
            return new response_model_1.ResponseModel('#', `Campo: ${index} no valido.`);
        }
    }
};
exports.validarCamposProducto = validarCamposProducto;
