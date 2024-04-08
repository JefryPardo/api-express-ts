"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCotizacion = void 0;
const express_1 = require("express");
const response_1 = require("../network/response");
const cotizacion_controller_1 = require("../controller/cotizacion.controller");
const routerCotizacion = (0, express_1.Router)();
exports.routerCotizacion = routerCotizacion;
routerCotizacion.post("/insert", (req, res) => {
    (0, cotizacion_controller_1.insertCotizacion)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerCotizacion.get("/all/by/usuario/:id", (req, res) => {
    (0, cotizacion_controller_1.getCotizacionesByIdUsuario)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerCotizacion.get("/find/:id", (req, res) => {
    (0, cotizacion_controller_1.getCotizacionesById)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerCotizacion.get("/update", (req, res) => {
    (0, cotizacion_controller_1.updateCotizacion)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
