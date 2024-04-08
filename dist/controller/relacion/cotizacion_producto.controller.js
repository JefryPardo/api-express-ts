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
exports.getCotizacionProductoAll = exports.deleteCotizacionProductoById = exports.updateCotizacionProducto = exports.insertCotizacionProducto = void 0;
const jwt_controlle_1 = require("../jwt.controlle");
const response_model_1 = require("../../models/model/response.model");
const validador_cotizacion_producto_1 = require("../../utils/validador.cotizacion-producto");
const excepcion_1 = require("../../excepcion/excepcion");
const producto_query_1 = require("../../query/producto.query");
const cotizacion_query_1 = require("../../query/cotizacion.query");
const cotizacion_producto_1 = require("../../query/relaciones/cotizacion_producto");
const insertCotizacionProducto = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    if (Object.keys(req.body).length === 0)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_cotizacion_producto_1.validarCamposCotizacionProducto)(req.body);
    const cotizacion_producto = (0, validador_cotizacion_producto_1.buildCotizacionProducto)(req.body);
    const producto = yield (0, producto_query_1._getProductoById)(cotizacion_producto.id_producto);
    if (!producto)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const cotizacion = yield (0, cotizacion_query_1._getCotizacionById)(cotizacion_producto.id_cotizacion);
    if (!cotizacion)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const invalid = yield (0, cotizacion_producto_1._getCotizacionProductoByidCotizacionAndIdProducto)(cotizacion_producto.id_producto, cotizacion_producto.id_cotizacion);
    if (invalid)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const estado_insert = yield (0, cotizacion_producto_1._insertCotizacionProducto)(cotizacion_producto.cantidad, cotizacion_producto.id_cotizacion, cotizacion_producto.id_producto);
    return new response_model_1.ResponseModel('#ICPS', estado_insert);
});
exports.insertCotizacionProducto = insertCotizacionProducto;
const deleteCotizacionProductoById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    if (!req.params.idcotizacion || !req.params.idproducto)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const id_cotizacion = req.params.idcotizacion;
    const id_producto = req.params.idproducto;
    const response = yield (0, cotizacion_producto_1._deleteCotizacionProductoByIds)(id_cotizacion, id_producto);
    if (!response)
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'deleteCotizacionProductoById', 'No se pudo borrar correctamente.');
    return new response_model_1.ResponseModel('#DCPS', response);
});
exports.deleteCotizacionProductoById = deleteCotizacionProductoById;
const updateCotizacionProducto = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id_cotizacion_producto = req.params.id;
    yield (0, jwt_controlle_1.validarToken)(req);
    if (Object.keys(req.body).length === 0)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_cotizacion_producto_1.validarCamposCotizacionProductoUpdate)(req.body);
    const cotizacion_producto_update = (0, validador_cotizacion_producto_1.buildCotizacionProductoUpdate)(req.body);
    const estado = yield (0, cotizacion_producto_1._updateCotizacionProducto)(id_cotizacion_producto, cotizacion_producto_update.id);
    return new response_model_1.ResponseModel('#UCPS', estado);
});
exports.updateCotizacionProducto = updateCotizacionProducto;
const getCotizacionProductoAll = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id_cotizacion = req.params.id;
    yield (0, jwt_controlle_1.validarToken)(req);
    const cotizacion_producto = yield (0, cotizacion_producto_1._getCotizacionProductoByIdCotizacion)(id_cotizacion);
    return new response_model_1.ResponseModel('#GCPS', cotizacion_producto);
});
exports.getCotizacionProductoAll = getCotizacionProductoAll;
