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
exports.updateMarcaById = exports.getMarcaById = exports.getAllMarca = exports.insertMarca = void 0;
const marca_query_1 = require("../query/marca.query");
const validador_1 = require("../utils/validador");
const excepcion_1 = require("../excepcion/excepcion");
const response_model_1 = require("../models/model/response.model");
const validador_marca_1 = require("../utils/validador.marca");
const insertMarca = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const marca = req.params.marca;
    return (0, marca_query_1._insertMarca)(marca);
});
exports.insertMarca = insertMarca;
const getAllMarca = () => __awaiter(void 0, void 0, void 0, function* () { return (0, marca_query_1._getAllMarca)(); });
exports.getAllMarca = getAllMarca;
const getMarcaById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const idMarca = req.params.id;
    if ((0, validador_1.esFormatoValido)(idMarca))
        throw (0, excepcion_1.NewExcepcion)('IDNOVALIDOEXCEPCION');
    return (0, marca_query_1._getMarcaById)(idMarca);
});
exports.getMarcaById = getMarcaById;
const updateMarcaById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    }
    (0, validador_marca_1.validarCamposMarca)(req.body);
    const rol = (0, validador_marca_1.buildMarca)(req.body);
    return (0, marca_query_1._updateMarca)(req.body.id, req.body.marca);
});
exports.updateMarcaById = updateMarcaById;
