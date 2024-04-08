"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCotizacionProducto = void 0;
const express_1 = require("express");
const response_1 = require("../../network/response");
const cotizacion_producto_controller_1 = require("../../controller/relacion/cotizacion_producto.controller");
const routerCotizacionProducto = (0, express_1.Router)();
exports.routerCotizacionProducto = routerCotizacionProducto;
routerCotizacionProducto.post("/insert", (req, res) => {
    (0, cotizacion_producto_controller_1.insertCotizacionProducto)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerCotizacionProducto.delete("/delete/:idcotizacion/:idproducto", (req, res) => {
    (0, cotizacion_producto_controller_1.deleteCotizacionProductoById)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
