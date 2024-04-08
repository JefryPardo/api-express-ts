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
exports.updateCategoriaById = exports.getCategoriaById = exports.getAllCategoria = exports.insertCategoria = void 0;
const categoria_query_1 = require("../query/categoria.query");
const validador_1 = require("../utils/validador");
const excepcion_1 = require("../excepcion/excepcion");
const response_model_1 = require("../models/model/response.model");
const validador_categoria_1 = require("../utils/validador.categoria");
const insertCategoria = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = req.params.categoria;
    return (0, categoria_query_1._insertCategoria)(categoria);
});
exports.insertCategoria = insertCategoria;
const getAllCategoria = () => __awaiter(void 0, void 0, void 0, function* () { return (0, categoria_query_1._getAllCategoria)(); });
exports.getAllCategoria = getAllCategoria;
const getCategoriaById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const idCategoria = req.params.id;
    if ((0, validador_1.esFormatoValido)(idCategoria))
        throw (0, excepcion_1.NewExcepcion)('IDNOVALIDOEXCEPCION');
    return (0, categoria_query_1._getCategoriaById)(idCategoria);
});
exports.getCategoriaById = getCategoriaById;
const updateCategoriaById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    }
    (0, validador_categoria_1.validarCamposCategoria)(req.body);
    const categoria = (0, validador_categoria_1.buildCategoria)(req.body);
    return (0, categoria_query_1._updateCategoria)(categoria);
});
exports.updateCategoriaById = updateCategoriaById;
