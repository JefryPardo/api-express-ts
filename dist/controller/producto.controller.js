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
exports.getAllPublicProductos = exports.getAllProductos = exports.updateEstadoProductoById = exports.updateProductoById = exports.getProductoById = exports.insertProducto = void 0;
const jwt_controlle_1 = require("./jwt.controlle");
const response_model_1 = require("../models/model/response.model");
const validador_producto_1 = require("../utils/validador.producto");
const producto_query_1 = require("../query/producto.query");
const insertProducto = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    }
    (0, validador_producto_1.validarCamposProducto)(req.body);
    const rol = (0, validador_producto_1.buildProducto)(req.body);
    return (0, producto_query_1._insertProducto)(rol);
});
exports.insertProducto = insertProducto;
const getProductoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const idProducto = req.params.id;
    const producto = yield (0, producto_query_1._getProductoById)(idProducto);
    return new response_model_1.ResponseModel('#SP', producto);
});
exports.getProductoById = getProductoById;
const updateProductoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_producto_1.validarCamposProducto)(req.body);
    if (req.body.estado != 'activo' && req.body.estado != 'inactivo')
        return new response_model_1.ResponseModel('#', 'Estado ingresado no valido.');
    return (0, producto_query_1._updateProducto)(req.body.id, req.body);
});
exports.updateProductoById = updateProductoById;
const updateEstadoProductoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_producto_1.validarCamposProducto)(req.body);
    if (!req.body.estado || req.body.id)
        return new response_model_1.ResponseModel('#', 'Campos ingresados NO son validos');
    if (req.body.estado != 'activo' && req.body.estado != 'inactivo')
        return new response_model_1.ResponseModel('#', 'Estado ingresado no valido.');
    return (0, producto_query_1._updateEstadoProducto)(req.body.id, req.body.estado);
});
exports.updateEstadoProductoById = updateEstadoProductoById;
const getAllPublicProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield (0, producto_query_1._getAllProductos)();
    const productosPares = productos.filter((_, index) => index % 2 === 0);
    const productosImpares = productos.filter((_, index) => index % 2 !== 0);
    const all_productos = {
        productos_impares: productosImpares,
        productos_pares: productosPares
    };
    return new response_model_1.ResponseModel('#SP', all_productos);
});
exports.getAllPublicProductos = getAllPublicProductos;
const getAllProductos = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    const productos = yield (0, producto_query_1._getAllProductos)();
    const productosPares = productos.filter((_, index) => index % 2 === 0);
    const productosImpares = productos.filter((_, index) => index % 2 !== 0);
    const all_productos = {
        productos_impares: productosImpares,
        productos_pares: productosPares
    };
    return new response_model_1.ResponseModel('#SP', all_productos);
});
exports.getAllProductos = getAllProductos;
