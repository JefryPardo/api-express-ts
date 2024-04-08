"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const response_1 = require("../../network/response");
const login_controller_1 = require("../../controller/auth/login.controller");
const register_controller_1 = require("../../controller/auth/register.controller");
const routerAuth = (0, express_1.Router)();
exports.routerAuth = routerAuth;
routerAuth.post("/login", (req, res) => {
    (0, login_controller_1.login)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
routerAuth.post("/register", (req, res) => {
    (0, register_controller_1.register)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
