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
exports._getCotizacionById = exports._getCotizacionByNombreAndUsuario = exports._updateCotizacion = exports._getCotizacionByIdUsuario = exports._insertCotizacion = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const conexion_1 = require("./conexion");
const _insertCotizacion = (cotizacion) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            INSERT INTO cotizacion (
                nombre,
                fecha_creacion, 
                fecha_vencimiento, 
                nombre_cliente, 
                cedula_cliente, 
                correo_cliente, 
                id_usuario
            ) VALUES (
                '${cotizacion.nombre}',
                '${cotizacion.fecha_creacion}', 
                '${cotizacion.fecha_vencimiento}', 
                '${cotizacion.nombre_cliente}', 
                '${cotizacion.cedula_cliente}', 
                '${cotizacion.correo_cliente}', 
                '${cotizacion.id_usuario}'
            )
        `;
        const result = yield consulta.query(query);
        if (result.rowCount === 1) {
            const usuarioResp = yield _getCotizacionByNombreAndUsuario(cotizacion.nombre, cotizacion.id_usuario);
            if (!usuarioResp)
                throw 'valor no esperado.';
            return usuarioResp;
        }
        throw 'respuesta no esperada.';
    }
    catch (error) {
        console.log(error);
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_insertCotizacion', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertCotizacion = _insertCotizacion;
const _getCotizacionByIdUsuario = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `SELECT * FROM cotizacion WHERE id_usuario = '${id_usuario}'`;
        const result = yield consulta.query(query);
        const cotizacion_list = result.rows;
        return cotizacion_list;
    }
    catch (error) {
        throw 'Error inesperado al obtener cotizacion por ID.';
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getCotizacionByIdUsuario = _getCotizacionByIdUsuario;
const _getCotizacionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `SELECT * FROM cotizacion WHERE id = '${id}'`;
        const result = yield consulta.query(query);
        if (result.rowCount !== 1)
            throw (0, excepcion_1.NewExcepcion)('FINDCOTIZACIONEXCEPCION');
        const cotizacion = result.rows[0];
        return cotizacion;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getCotizacionById', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getCotizacionById = _getCotizacionById;
const _getCotizacionByNombreAndUsuario = (nombre, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `SELECT * FROM cotizacion WHERE nombre = '${nombre}' and id_usuario = '${id_usuario}'`;
        const result = yield consulta.query(query);
        return result.rows[0] ? true : false;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getCotizacionByNombreAndUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getCotizacionByNombreAndUsuario = _getCotizacionByNombreAndUsuario;
const _updateCotizacion = (id, cotizacion) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            UPDATE 
                cotizacion
            SET 
                fecha_creacion = $1, 
                fecha_vencimiento = $2, 
                nombre_cliente = $3, 
                cedula_cliente = $4,
                correo_cliente = $5, 
                id_usuario = $6,
                nombre = $7
            WHERE 
                id = $8
        `;
        const values = [
            cotizacion.fecha_creacion,
            cotizacion.fecha_vencimiento,
            cotizacion.nombre_cliente,
            cotizacion.cedula_cliente,
            cotizacion.correo_cliente,
            cotizacion.id_usuario,
            cotizacion.nombre,
            id,
        ];
        const result = yield consulta.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw 'Error inesperado al actualizar cotizacion.';
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateCotizacion = _updateCotizacion;
