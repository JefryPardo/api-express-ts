"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProducto = void 0;
const express_1 = require("express");
const response_1 = require("../network/response");
const producto_controller_1 = require("../controller/producto.controller");
const routerProducto = (0, express_1.Router)();
exports.routerProducto = routerProducto;
routerProducto.get("/public/all", (req, res) => {
    (0, producto_controller_1.getAllPublicProductos)()
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerProducto.get("/all", (req, res) => {
    (0, producto_controller_1.getAllProductos)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerProducto.get("/find/:id", (req, res) => {
    (0, producto_controller_1.getProductoById)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
