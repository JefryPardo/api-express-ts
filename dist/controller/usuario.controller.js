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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarioByUsuarioRequest = exports.getUsuarioByUsuario = exports.validarDisponibilidadUsuario = exports.updateEstadoUsuarioById = exports.updateUsuarioById = exports.getUsuarioById = exports.insertUsuario = void 0;
const response_model_1 = require("../models/model/response.model");
const usuario_query_1 = require("../query/usuario.query");
const validador_usuario_1 = require("../utils/validador.usuario");
const validador_1 = require("../utils/validador");
const excepcion_1 = require("../excepcion/excepcion");
const jwt_controlle_1 = require("./jwt.controlle");
const insertUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, usuario_query_1._insertUsuario)(usuario);
});
exports.insertUsuario = insertUsuario;
const getUsuarioById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    const idUsuario = req.params.id;
    if ((0, validador_1.esFormatoValido)(idUsuario))
        throw (0, excepcion_1.NewExcepcion)('IDNOVALIDOEXCEPCION');
    return (0, usuario_query_1._getUsuarioById)(idUsuario);
});
exports.getUsuarioById = getUsuarioById;
const getUsuarioByUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, usuario_query_1._getUsuarioByUsuario)(usuario);
});
exports.getUsuarioByUsuario = getUsuarioByUsuario;
const getUsuarioByUsuarioRequest = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    const usuario = req.params.usuario;
    return (0, usuario_query_1._getUsuarioByUsuario)(usuario);
});
exports.getUsuarioByUsuarioRequest = getUsuarioByUsuarioRequest;
const validarDisponibilidadUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, usuario_query_1._getDisponibilidadUsuarioByUsuario)(usuario);
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'validarDisponibilidadUsuario', error);
    }
});
exports.validarDisponibilidadUsuario = validarDisponibilidadUsuario;
const updateUsuarioById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_usuario_1.validarCamposUsuario)(req.body);
    if (req.body.estado != 'activo' && req.body.estado != 'inactivo')
        return new response_model_1.ResponseModel('#', 'Estado ingresado no valido.');
    return (0, usuario_query_1._updateUsuario)(req.body.id, req.body);
});
exports.updateUsuarioById = updateUsuarioById;
const updateEstadoUsuarioById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_usuario_1.validarCamposUsuario)(req.body);
    if (!req.body.estado || req.body.id)
        return new response_model_1.ResponseModel('#', 'Campos ingresados NO son validos');
    if (req.body.estado != 'activo' && req.body.estado != 'inactivo')
        return new response_model_1.ResponseModel('#', 'Estado ingresado no valido.');
    return (0, usuario_query_1._updateEstadoUsuario)(req.body.id, req.body.estado);
});
exports.updateEstadoUsuarioById = updateEstadoUsuarioById;
