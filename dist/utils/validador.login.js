"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCamposLogin = exports.buildLogin = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const login_model_1 = require("../models/auth/login.model");
const buildLogin = (data) => {
    try {
        let auth = new login_model_1.LoginModel();
        auth.usuario = data.usuario;
        auth.clave = data.clave;
        return auth;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('BUILDEXCEPCION');
    }
};
exports.buildLogin = buildLogin;
const validarCamposLogin = (authBody) => {
    for (let index in authBody) {
        if (index != "usuario" &&
            index != "clave") {
            throw (0, excepcion_1.NewExcepcion)('GENERICO', `Campo: '${index}' no valido.`);
        }
    }
};
exports.validarCamposLogin = validarCamposLogin;
