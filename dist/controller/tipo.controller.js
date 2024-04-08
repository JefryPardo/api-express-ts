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
exports.updateTipoById = exports.getTipoById = exports.getAllTipo = exports.insertTipo = void 0;
const tipo_query_1 = require("../query/tipo.query");
const validador_1 = require("../utils/validador");
const excepcion_1 = require("../excepcion/excepcion");
const response_model_1 = require("../models/model/response.model");
const validador_tipo_1 = require("../utils/validador.tipo");
const insertTipo = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const tipo = req.params.tipo;
    return (0, tipo_query_1._insertTipo)(tipo);
});
exports.insertTipo = insertTipo;
const getAllTipo = () => __awaiter(void 0, void 0, void 0, function* () { return (0, tipo_query_1._getAllTipo)(); });
exports.getAllTipo = getAllTipo;
const getTipoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const idTipo = req.params.id;
    if ((0, validador_1.esFormatoValido)(idTipo))
        throw (0, excepcion_1.NewExcepcion)('IDNOVALIDOEXCEPCION');
    return (0, tipo_query_1._getTipoById)(idTipo);
});
exports.getTipoById = getTipoById;
const updateTipoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    }
    (0, validador_tipo_1.validarCamposTipo)(req.body);
    const tipo = (0, validador_tipo_1.buildTipo)(req.body);
    return (0, tipo_query_1._updateTipoById)(tipo);
});
exports.updateTipoById = updateTipoById;
