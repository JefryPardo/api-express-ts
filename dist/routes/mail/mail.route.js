"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMail = void 0;
const express_1 = require("express");
const email_controller_1 = require("../../controller/email.controller");
const response_1 = require("../../network/response");
const routerMail = (0, express_1.Router)();
exports.routerMail = routerMail;
routerMail.post('/enviar-correo', (req, res) => {
    (0, email_controller_1.enviarCorreo)(req)
        .then(_res => (0, response_1.succes)(req, res, _res))
        .catch(_error => (0, response_1.error)(req, res, _error));
});
