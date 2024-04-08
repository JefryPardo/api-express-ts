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
exports._getUsuarioByUsuario = exports._getDisponibilidadUsuarioByUsuario = exports._updateEstadoUsuario = exports._updateUsuario = exports._getUsuarioById = exports._insertUsuario = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const usuario_model_1 = require("../models/model/usuario.model");
const conexion_1 = require("./conexion");
const _insertUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            INSERT INTO usuario (
                nombre, 
                apellido, 
                direccion, 
                celular, 
                fecha_creacion,
                intentos_fallidos, 
                clave, 
                usuario, 
                estado
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            )
        `;
        const values = [
            usuario.nombre,
            usuario.apellido,
            usuario.direccion,
            usuario.celular,
            usuario.fecha_creacion,
            usuario.intentos_fallidos,
            usuario.clave,
            usuario.usuario,
            usuario.estado,
        ];
        const result = yield consulta.query(query, values);
        if (result.rowCount === 1) {
            const usuarioResp = yield _getUsuarioByUsuario(usuario.usuario);
            if (usuarioResp == null)
                throw 'valor no esperado.';
            return usuarioResp;
        }
        throw 'respuesta no esperada.';
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_insertUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertUsuario = _insertUsuario;
const _getUsuarioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `SELECT * FROM usuario WHERE id = '${id}'`;
        const result = yield consulta.query(query);
        let response = new usuario_model_1.UsuarioModel();
        if (result.rows[0]) {
            response = result.rows[0];
            return response;
        }
        return response;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getUsuarioById', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getUsuarioById = _getUsuarioById;
const _getDisponibilidadUsuarioByUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `SELECT * FROM usuario WHERE usuario = '${usuario}'`;
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
exports._getDisponibilidadUsuarioByUsuario = _getDisponibilidadUsuarioByUsuario;
const _getUsuarioByUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `SELECT * FROM usuario WHERE usuario = '${usuario}'`;
        const result = yield consulta.query(query);
        if (result.rows[0]) {
            const response = result.rows[0];
            return response;
        }
        return null;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getUsuarioByUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getUsuarioByUsuario = _getUsuarioByUsuario;
const _updateUsuario = (id, usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            UPDATE 
                usuario
            SET 
                nombre = $1, 
                apellido = $2, 
                direccion = $3, 
                celular = $4,
                fecha_creacion = $5,
                intentos_fallidos = $6, 
                clave = $7, 
                usuario = $8, 
                estado = $9
            WHERE 
                id = $10
        `;
        const values = [
            usuario.nombre,
            usuario.apellido,
            usuario.direccion,
            usuario.celular,
            usuario.fecha_creacion,
            usuario.intentos_fallidos,
            usuario.clave,
            usuario.usuario,
            usuario.estado,
            id,
        ];
        const result = yield consulta.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_updateUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateUsuario = _updateUsuario;
const _updateEstadoUsuario = (id, estado) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            UPDATE 
                usuario
            SET 
                estado = $1
            WHERE 
                id = $2
        `;
        const values = [
            estado,
            id,
        ];
        const result = yield consulta.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_updateEstadoUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateEstadoUsuario = _updateEstadoUsuario;
