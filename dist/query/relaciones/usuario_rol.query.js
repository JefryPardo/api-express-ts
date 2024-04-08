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
exports._getUsuarioRolByIdUsuario = exports._deleteUsuarioRolById = exports._getUsuarioRolById = exports._insertUsuarioRol = void 0;
const excepcion_1 = require("../../excepcion/excepcion");
const response_model_1 = require("../../models/model/response.model");
const conexion_1 = require("../conexion");
const _insertUsuarioRol = (id_usuario, id_rol) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                usuario_rol (id_usuario,id_rol) 
                VALUES ($1,$2)`, [id_usuario, id_rol]);
        if (respuesta.rowCount === 1)
            return true;
        throw 'respuesta no esperada.';
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_insertUsuarioRol', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertUsuarioRol = _insertUsuarioRol;
const _getUsuarioRolById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                id_usuario,
                id_rol
            FROM 
                usuario_rol 
            WHERE 
                id = ${id}`);
        if (respuesta.rowCount < 1) {
            return new response_model_1.ResponseModel('#', []);
        }
        const rolList = respuesta.rows;
        return rolList;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getUsuarioRolById', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getUsuarioRolById = _getUsuarioRolById;
const _getUsuarioRolByIdUsuario = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                id_usuario,
                id_rol
            FROM 
                usuario_rol 
            WHERE 
                id_usuario = '${id_usuario}'`);
        const id_rol_list = respuesta.rows;
        return id_rol_list;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getUsuarioRolByIdUsuario', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getUsuarioRolByIdUsuario = _getUsuarioRolByIdUsuario;
const _deleteUsuarioRolById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`DELETE FROM usuario_rol WHERE id = ${id}`);
        if (respuesta.rowCount > 0)
            return true;
        return 'No se encontró ningún registro para eliminar';
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_deleteUsuarioRolById', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._deleteUsuarioRolById = _deleteUsuarioRolById;
