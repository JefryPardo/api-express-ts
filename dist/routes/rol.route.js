"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRol = void 0;
const express_1 = require("express");
const response_1 = require("../network/response");
const rol_controller_1 = require("../controller/rol.controller");
const routerRol = (0, express_1.Router)();
exports.routerRol = routerRol;
routerRol.post("/insert", (req, res) => {
    (0, rol_controller_1.insertRol)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerRol.get("/all", (req, res) => {
    (0, rol_controller_1.getAllRol)()
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
