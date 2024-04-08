"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarPassword = exports.fechaActual = exports.encriptadoDeClave = exports.validarStringLetrasNumeros = exports.validarStringNumerico = exports.validarEstandaresPassword = exports.limpiarEspaciosExtremos = exports.validarSoloLetras = exports.validarEmailFormato = exports.esFormatoValido = exports.validarAlfaNumerico = exports.validarNumero = exports.validarSplitDeNumeros = void 0;
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const moment_1 = __importDefault(require("moment"));
const excepcion_1 = require("../excepcion/excepcion");
/**
 *
 * @param cadena
 * @returns (false) sí todos los elementos del array son numero.
 */
const validarSplitDeNumeros = (cadena) => {
    const idsArray = cadena.split(',');
    for (let index = 0; index < idsArray.length; index++) {
        if (!Number.isInteger(idsArray[index])) {
            return true;
        }
    }
    return false;
};
exports.validarSplitDeNumeros = validarSplitDeNumeros;
/**
 *
 * @param numero
 * @returns (true) sí el string de entrada es un numero
 */
const validarNumero = (numero) => {
    const estado = Number.isInteger(Number(numero));
    const respuesta = {
        valido: estado,
        numero: (estado) ? Number(numero) : null
    };
    return respuesta;
};
exports.validarNumero = validarNumero;
/**
 *
 * @param cadena
 * @returns (true) sí es alfanumerico
 */
const validarAlfaNumerico = (cadena) => {
    const regxp = "/([a-zA-Z0-9])/";
    const regexp = new RegExp(regxp);
    const res = regexp.test(cadena);
    let estado = false;
    const respuesta = {
        valido: estado,
        alfanumerico: (estado) ? cadena : null
    };
    return respuesta;
};
exports.validarAlfaNumerico = validarAlfaNumerico;
/**
 *
 * @param cadena
 * @returns (true) sí el campo ingresado tiene un formato valido
 */
const esFormatoValido = (campo) => {
    const uuidRegex = /^[0-9a-fA-F]{32}$/;
    return !uuidRegex.test(campo);
};
exports.esFormatoValido = esFormatoValido;
const validarEmailFormato = (body) => {
    return validator_1.default.isEmail(body.usuario);
};
exports.validarEmailFormato = validarEmailFormato;
const validarSoloLetras = (texto) => {
    return !validator_1.default.isAlpha(texto);
};
exports.validarSoloLetras = validarSoloLetras;
const limpiarEspaciosExtremos = (texto) => {
    return texto.trim();
};
exports.limpiarEspaciosExtremos = limpiarEspaciosExtremos;
const validarStringNumerico = (texto) => {
    return !validator_1.default.isNumeric(texto);
};
exports.validarStringNumerico = validarStringNumerico;
const validarStringLetrasNumeros = (texto) => {
    return !validator_1.default.isAlphanumeric(texto);
};
exports.validarStringLetrasNumeros = validarStringLetrasNumeros;
const validarEstandaresPassword = (body) => {
    const resultado = (0, zxcvbn_1.default)(body.clave);
    let sugerencias = [];
    if (resultado.score < 3) {
        sugerencias = resultado.feedback.suggestions;
    }
    return sugerencias;
};
exports.validarEstandaresPassword = validarEstandaresPassword;
const encriptadoDeClave = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(new Error('ENCRIPTADOEXCEPCION'));
            }
            else {
                resolve(hash);
            }
        });
    });
});
exports.encriptadoDeClave = encriptadoDeClave;
const validarPassword = (password, clave) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, clave, (err, result) => {
            if (err) {
                throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'validarPassword', err);
            }
            resolve(result);
        });
    });
});
exports.validarPassword = validarPassword;
const fechaActual = () => {
    return (0, moment_1.default)().format('YYYY-MM-DD HH:mm');
};
exports.fechaActual = fechaActual;
