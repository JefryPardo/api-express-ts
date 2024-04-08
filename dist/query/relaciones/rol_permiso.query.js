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
exports.deleteRolPermisoById = exports.getRolPermisoByIdRol = exports.getRolPermisoById = exports.insertRolPermiso = void 0;
const logger_1 = require("../../logs/logger");
const conexion_1 = require("../conexion");
const insertRolPermiso = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id_rol, id_permiso }) {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                rol_permiso (id_rol,id_permiso) 
                VALUES ($1,$2)`, [id_rol, id_permiso]);
    }
    catch (error) {
        logger_1.logger.error(`Error en insertRolPermiso:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #RP02`;
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports.insertRolPermiso = insertRolPermiso;
const getRolPermisoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                id_rol,
                id_permiso
            FROM 
                rol_permiso 
            WHERE 
                id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getRolPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP04";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports.getRolPermisoById = getRolPermisoById;
const getRolPermisoByIdRol = (id_rol) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                id_rol,
                id_permiso
            FROM 
                rol_permiso
            WHERE 
                id_rol = ${id_rol}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getRolPermisoByIdRol:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP05";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports.getRolPermisoByIdRol = getRolPermisoByIdRol;
const deleteRolPermisoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`DELETE FROM rol_permiso WHERE id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en deleteRolPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP05";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports.deleteRolPermisoById = deleteRolPermisoById;
