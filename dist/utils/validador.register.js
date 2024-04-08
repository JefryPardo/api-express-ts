"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limpiarCamposRegister = exports.validarCamposRegister = exports.validarBodyRegister = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const register_model_1 = require("../models/auth/register.model");
const validador_1 = require("./validador");
const validarBodyRegister = (registerBody) => {
    for (let index in registerBody) {
        if (index != "nombre" &&
            index != "apellido" &&
            index != "direccion" &&
            index != "celular" &&
            index != "tipo_documento" &&
            index != "documento" &&
            index != "clave" &&
            index != "usuario") {
            console.log('entro: ', index);
            throw (0, excepcion_1.NewExcepcion)('GENERICO', `Campo: '${index}' no valido.`);
        }
    }
};
exports.validarBodyRegister = validarBodyRegister;
const validarCamposRegister = (campos) => {
    const registro = limpiarCamposRegister(campos);
    // if(!validarEmailFormato(registro.usuario))          throw NewExcepcion('CAMPOUSUARIOEXCEPCION');
    // if(validarSoloLetras(registro.nombre))              throw NewExcepcion('CAMPONOMBREEXCEPCION');
    // if(validarSoloLetras(registro.apellido))            throw NewExcepcion('CAMPOAPELLIDOEXCEPCION');
    // if(validarStringNumerico(registro.celular))         throw NewExcepcion('CAMPOCELULAREXCEPCION');
    // if(validarStringNumerico(registro.tipo_documento))  throw NewExcepcion('CAMPOTIPODOCUMENTOEXCEPCION');
    // if(validarStringLetrasNumeros(registro.documento))  throw NewExcepcion('CAMPODOCUMENTOEXCEPCION');
    return registro;
};
exports.validarCamposRegister = validarCamposRegister;
const limpiarCamposRegister = (campos) => {
    try {
        let registro = new register_model_1.RegisterModel();
        registro.nombre = (0, validador_1.limpiarEspaciosExtremos)(campos.nombre);
        registro.apellido = (0, validador_1.limpiarEspaciosExtremos)(campos.apellido);
        registro.direccion = (0, validador_1.limpiarEspaciosExtremos)(campos.direccion);
        registro.celular = (0, validador_1.limpiarEspaciosExtremos)(campos.celular);
        registro.tipo_documento = (0, validador_1.limpiarEspaciosExtremos)(campos.tipo_documento);
        registro.documento = (0, validador_1.limpiarEspaciosExtremos)(campos.documento);
        registro.usuario = (0, validador_1.limpiarEspaciosExtremos)(campos.usuario);
        registro.clave = campos.clave;
        return registro;
    }
    catch (error) {
        logger_1.logger.error('Error en limpiarCamposRegister: ' + error);
        throw (0, excepcion_1.NewExcepcion)('VALIDADOREXCEPCION', 'limpiarCamposRegister');
    }
};
exports.limpiarCamposRegister = limpiarCamposRegister;
