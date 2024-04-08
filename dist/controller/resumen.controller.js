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
exports.getResumen = void 0;
const jwt_controlle_1 = require("./jwt.controlle");
const excepcion_1 = require("../excepcion/excepcion");
const cotizacion_query_1 = require("../query/cotizacion.query");
const cotizacion_producto_1 = require("../query/relaciones/cotizacion_producto");
const producto_query_1 = require("../query/producto.query");
const resumen_producto_model_1 = require("../models/model/resumen-producto.model");
const resumen_model_1 = require("../models/model/resumen.model");
const response_model_1 = require("../models/model/response.model");
const getResumen = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id_cotizacion = req.params.id;
    yield (0, jwt_controlle_1.validarToken)(req);
    const cotizacion = yield (0, cotizacion_query_1._getCotizacionById)(id_cotizacion);
    if (cotizacion.id == undefined || cotizacion.id == null)
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'getResumen', 'valor no esperado al consultar cotizacion.');
    ;
    const cotizacion_producto = yield (0, cotizacion_producto_1._getCotizacionProductoByIdCotizacion)(cotizacion.id);
    let resumen_producto_list = [];
    for (const data of cotizacion_producto) {
        const resumen_producto = new resumen_producto_model_1.ResumenProductoModel();
        const id_producto = data.id_producto;
        const producto = yield (0, producto_query_1._getProductoById)(id_producto);
        resumen_producto.cantidad = data.cantidad;
        resumen_producto.producto = producto;
        resumen_producto_list.push(resumen_producto);
    }
    let resumen = new resumen_model_1.ResumenModel();
    resumen.cotizacion = cotizacion;
    resumen.resumen_producto = resumen_producto_list;
    return new response_model_1.ResponseModel('#SR', resumen);
});
exports.getResumen = getResumen;
