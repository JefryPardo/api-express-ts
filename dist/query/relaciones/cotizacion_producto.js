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
exports._updateCotizacionProducto = exports._getCotizacionProductoByidCotizacionAndIdProducto = exports._deleteCotizacionProductoByIds = exports._getCotizacionProductoByIdCotizacion = exports._getCotizacionProductoById = exports._insertCotizacionProducto = void 0;
const excepcion_1 = require("../../excepcion/excepcion");
const conexion_1 = require("../conexion");
const _insertCotizacionProducto = (cantidad, id_cotizacion, id_producto) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO cotizacion_producto (cantidad,id_cotizacion, id_producto) VALUES ('${cantidad}','${id_cotizacion}','${id_producto}')`);
        return (respuesta.rowCount === 1);
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertCotizacionProducto = _insertCotizacionProducto;
const _getCotizacionProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                cantidad,
                id_producto,
                id_cotizacion
            FROM 
                cotizacion_producto 
            WHERE 
                id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getCotizacionProductoById = _getCotizacionProductoById;
const _getCotizacionProductoByIdCotizacion = (id_rol) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                cantidad,
                id_producto,
                id_cotizacion
            FROM 
                cotizacion_producto
            WHERE 
                id_cotizacion = '${id_rol}'`);
        const cotizacion_list = respuesta.rows;
        return cotizacion_list;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getCotizacionById', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getCotizacionProductoByIdCotizacion = _getCotizacionProductoByIdCotizacion;
const _deleteCotizacionProductoByIds = (id_cotizacion, id_producto) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`DELETE FROM cotizacion_producto WHERE id_cotizacion = '${id_cotizacion}' and id_producto = '${id_producto}'`);
        if (respuesta.rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._deleteCotizacionProductoByIds = _deleteCotizacionProductoByIds;
const _getCotizacionProductoByidCotizacionAndIdProducto = (id_producto, id_cotizacion) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `SELECT * FROM cotizacion_producto WHERE id_producto = '${id_producto}' and id_cotizacion = '${id_cotizacion}'`;
        const result = yield consulta.query(query);
        return result.rows[0] ? true : false;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getCotizacionProductoByidCotizacionAndIdProducto = _getCotizacionProductoByidCotizacionAndIdProducto;
const _updateCotizacionProducto = (id, cantidad) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`UPDATE cotizacion_producto
            SET cantidad = '${cantidad}'
            WHERE id = ${id}`);
        if (respuesta.rowCount === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateCotizacionProducto = _updateCotizacionProducto;
