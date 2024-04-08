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
exports.getCotizacionesById = exports.getCotizacionByNombreAndUsuario = exports.updateCotizacion = exports.getCotizacionesByIdUsuario = exports.insertCotizacion = void 0;
const response_model_1 = require("../models/model/response.model");
const validador_cotizacion_1 = require("../utils/validador.cotizacion");
const cotizacion_query_1 = require("../query/cotizacion.query");
const excepcion_1 = require("../excepcion/excepcion");
const jwt_controlle_1 = require("./jwt.controlle");
const usuario_query_1 = require("../query/usuario.query");
const insertCotizacion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    if (Object.keys(req.body).length === 0)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_cotizacion_1.validarCamposCotizacion)(req.body);
    let cotizacion = (0, validador_cotizacion_1.buildCotizacion)(req.body);
    cotizacion.fecha_creacion = obtenerFechaConFormato();
    const usuario = yield (0, usuario_query_1._getUsuarioById)(cotizacion.id_usuario);
    if (!usuario || usuario.estado == 'inactivo')
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const invalido = yield getCotizacionByNombreAndUsuario(cotizacion.nombre, usuario.id);
    if (invalido)
        throw (0, excepcion_1.NewExcepcion)('NOMBRECOTIZACIONEXCEPCION');
    const response = yield (0, cotizacion_query_1._insertCotizacion)(cotizacion);
    if (!response)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    return new response_model_1.ResponseModel('#CS', 'Se inserto correctamente.');
});
exports.insertCotizacion = insertCotizacion;
const getCotizacionesByIdUsuario = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    if (!req.params.id)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const id_usuario = req.params.id;
    let response = yield (0, usuario_query_1._getUsuarioById)(id_usuario);
    if (response == null)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const cotizaciones = yield (0, cotizacion_query_1._getCotizacionByIdUsuario)(id_usuario);
    return new response_model_1.ResponseModel('#SC', cotizaciones);
});
exports.getCotizacionesByIdUsuario = getCotizacionesByIdUsuario;
const updateCotizacion = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // await validarToken(req);
    // if(!req.body) {
    //     return new ResponseModel('#','Data ingresada no validad.');
    // }
    // validarCamposCotizacion(req.body);
    // const cotizacion: CotizacionModel = buildCotizacion(req.body);
    // return _updateCotizacion(cotizacion.id, cotizacion);
});
exports.updateCotizacion = updateCotizacion;
const obtenerFechaConFormato = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaActual.getFullYear();
    return `${dia}/${mes}/${año}`;
};
const getCotizacionByNombreAndUsuario = (nombre, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, cotizacion_query_1._getCotizacionByNombreAndUsuario)(nombre, id_usuario);
});
exports.getCotizacionByNombreAndUsuario = getCotizacionByNombreAndUsuario;
const getCotizacionesById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    if (!req.params.id)
        throw (0, excepcion_1.NewExcepcion)('GENERICO');
    const id = req.params.id;
    const cotizaciones = yield (0, cotizacion_query_1._getCotizacionById)(id);
    return new response_model_1.ResponseModel('#GCS', cotizaciones);
});
exports.getCotizacionesById = getCotizacionesById;
