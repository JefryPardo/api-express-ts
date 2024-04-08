"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerResumen = void 0;
const express_1 = require("express");
const response_1 = require("../network/response");
const resumen_controller_1 = require("../controller/resumen.controller");
const routerResumen = (0, express_1.Router)();
exports.routerResumen = routerResumen;
routerResumen.get("/find/:id", (req, res) => {
    (0, resumen_controller_1.getResumen)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
