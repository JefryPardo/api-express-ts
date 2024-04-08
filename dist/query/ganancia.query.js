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
exports._updateGananciaById = exports._getGananciaByIdUsuario = exports._deleteGananciaById = exports._getGananciaById = exports._insertGanancia = void 0;
const logger_1 = require("../logs/logger");
const conexion_1 = require("./conexion");
const _insertGanancia = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id_usuario, id_producto, porcentaje_ganancia }) {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                ganancia(id_usuario, id_producto, porcentaje_ganancia) 
                VALUES ($1,$2,$3)`, [id_usuario, id_producto, porcentaje_ganancia]);
    }
    catch (error) {
        logger_1.logger.error(`Error en insertGanancia:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #G02`;
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertGanancia = _insertGanancia;
const _getGananciaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                id_usuario,
                id_categoria,
                porcentaje_ganancia
            FROM 
                ganancia 
            WHERE 
                id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getGananciaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G03";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getGananciaById = _getGananciaById;
const _getGananciaByIdProducto = (id_producto) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                id_usuario,
                id_producto,
                porcentaje_ganancia
            FROM 
                ganancia 
            WHERE 
            id_producto = ${id_producto}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getGananciaByIdProducto:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G03";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
const _deleteGananciaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`DELETE FROM ganancia WHERE id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en deleteGananciaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G05";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._deleteGananciaById = _deleteGananciaById;
const _getGananciaByIdUsuario = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                id_usuario,
                id_producto,
                porcentaje_ganancia
            FROM 
                ganancia 
            WHERE 
            id_usuario = ${idUsuario}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getGananciaByIdUsuario:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G04";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getGananciaByIdUsuario = _getGananciaByIdUsuario;
const _updateGananciaById = (id, porcentaje_ganancia) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            UPDATE 
                ganancia
            SET 
                porcentaje_ganancia = $1 
            WHERE 
                id = $2
        `;
        const values = [
            porcentaje_ganancia,
            id
        ];
        const result = yield consulta.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw 'Error inesperado al actualizar usuario.';
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateGananciaById = _updateGananciaById;
