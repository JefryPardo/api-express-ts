"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRouter = void 0;
const express_1 = require("express");
const response_1 = require("../network/response");
const usuario_controller_1 = require("../controller/usuario.controller");
const usuarioRouter = (0, express_1.Router)();
exports.usuarioRouter = usuarioRouter;
usuarioRouter.get("/find/:id", (req, res) => {
    (0, usuario_controller_1.getUsuarioById)(req)
        .then(_res => (0, response_1.succes)(req, res, _res));
});
usuarioRouter.get("/find/usuario/:usuario", (req, res) => {
    (0, usuario_controller_1.getUsuarioByUsuarioRequest)(req)
        .then(_res => (0, response_1.succes)(req, res, _res));
});
