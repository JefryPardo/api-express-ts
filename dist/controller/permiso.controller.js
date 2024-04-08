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
exports.updateEstadoPermisoById = exports.getPermisoById = exports.insertPermiso = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const response_model_1 = require("../models/model/response.model");
const permiso_query_1 = require("../query/permiso.query");
const validador_1 = require("../utils/validador");
const validador_permiso_1 = require("../utils/validador.permiso");
const insertPermiso = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return new response_model_1.ResponseModel('#IPF01', 'Data ingresada no validad.');
    }
    (0, validador_permiso_1.validarCamposPermiso)(req.body);
    const permiso = (0, validador_permiso_1.buildPermiso)(req.body);
    return (0, permiso_query_1._insertPermiso)(permiso);
});
exports.insertPermiso = insertPermiso;
const getPermisoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const idPermiso = req.params.id;
    if ((0, validador_1.esFormatoValido)(idPermiso))
        throw (0, excepcion_1.NewExcepcion)('IDNOVALIDOEXCEPCION');
    return (0, permiso_query_1._getPermisoById)(idPermiso);
});
exports.getPermisoById = getPermisoById;
const updateEstadoPermisoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_permiso_1.validarCamposPermiso)(req.body);
    if (!req.body.estado || req.body.id)
        return new response_model_1.ResponseModel('#', 'Campos ingresados NO son validos');
    return (0, permiso_query_1._updateEstadoPermiso)(req.body.id, req.body.estado);
});
exports.updateEstadoPermisoById = updateEstadoPermisoById;
