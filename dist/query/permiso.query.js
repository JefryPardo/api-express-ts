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
exports._updateEstadoPermiso = exports._getPermisoById = exports._insertPermiso = void 0;
const conexion_1 = require("./conexion");
const logger_1 = require("../logs/logger");
const _insertPermiso = (_a) => __awaiter(void 0, [_a], void 0, function* ({ permiso, estado }) {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                permiso (permiso,estado) 
                VALUES ($1,$2)`, [permiso, estado]);
    }
    catch (error) {
        logger_1.logger.error(`Error en insertPermiso:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #P02`;
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertPermiso = _insertPermiso;
const _getPermisoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                permiso,
                estado
            FROM 
                permiso 
            WHERE 
                id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #P03";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getPermisoById = _getPermisoById;
const _updateEstadoPermiso = (id, estado) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`UPDATE permiso
            SET estado = ${estado}
            WHERE id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en updateEstadoPermiso:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #P04";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateEstadoPermiso = _updateEstadoPermiso;
