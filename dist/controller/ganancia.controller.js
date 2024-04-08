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
exports.updateGananciaById = exports.getGananciaByIdUsuario = exports.insertGanancia = void 0;
const response_model_1 = require("../models/model/response.model");
const validador_ganancia_1 = require("../utils/validador.ganancia");
const ganancia_query_1 = require("../query/ganancia.query");
const validador_1 = require("../utils/validador");
const excepcion_1 = require("../excepcion/excepcion");
const insertGanancia = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    }
    (0, validador_ganancia_1.validarCamposGanancia)(req.body);
    const ganancia = (0, validador_ganancia_1.buildGanancia)(req.body);
    return (0, ganancia_query_1._insertGanancia)(ganancia);
});
exports.insertGanancia = insertGanancia;
const getGananciaByIdUsuario = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const idUsuario = req.params.id;
    if ((0, validador_1.esFormatoValido)(idUsuario))
        throw (0, excepcion_1.NewExcepcion)('IDNOVALIDOEXCEPCION');
    return (0, ganancia_query_1._getGananciaByIdUsuario)(idUsuario);
});
exports.getGananciaByIdUsuario = getGananciaByIdUsuario;
const updateGananciaById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const idGanancia = req.params.id;
    const porcentaje_ganancia = req.params.procentaje;
    if ((0, validador_1.esFormatoValido)(idGanancia))
        throw (0, excepcion_1.NewExcepcion)('IDNOVALIDOEXCEPCION');
    return (0, ganancia_query_1._updateGananciaById)(idGanancia, porcentaje_ganancia);
});
exports.updateGananciaById = updateGananciaById;
