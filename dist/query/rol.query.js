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
exports._updateRolById = exports._updateEstadoRolById = exports._getRolById = exports._insertRol = exports._getAllRols = void 0;
const conexion_1 = require("./conexion");
const logger_1 = require("../logs/logger");
const excepcion_1 = require("../excepcion/excepcion");
const query_excepcion_1 = require("../excepcion/class/query.excepcion");
const response_model_1 = require("../models/model/response.model");
const _getAllRols = () => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`
                SELECT 
                    id, 
                    rol, 
                    estado
                from rol
            `);
        if (respuesta.rowCount < 1) {
            return new response_model_1.ResponseModel('#GR01', []);
        }
        const rolList = respuesta.rows;
        logger_1.logger.info(`getAllRols: se encontraron ${rolList.length} roles`);
        return new response_model_1.ResponseModel('#GAR01', rolList);
    }
    catch (error) {
        logger_1.logger.error(`Error en getAllRols:  ${error}`);
        throw (0, excepcion_1.NewExcepcion)('ROLEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getAllRols = _getAllRols;
const _insertRol = (_a) => __awaiter(void 0, [_a], void 0, function* ({ rol, estado }) {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                rol (rol,estado) 
                VALUES ($1,$2)`, [rol, estado]);
        if (respuesta.rowCount === 1) {
            logger_1.logger.info(`insert rol, ${rol} success`);
            return new response_model_1.ResponseModel('#IR01', 'Se guardo correctamente el rol.');
        }
        throw (0, excepcion_1.NewExcepcion)('INSERTROLEXCEPCION');
    }
    catch (error) {
        logger_1.logger.error(`Error en _insertRol:  ${error}`);
        if (error instanceof query_excepcion_1.Excepcion) {
            throw error;
        }
        throw (0, excepcion_1.NewExcepcion)('ROLEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertRol = _insertRol;
const _getRolById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                rol,
                estado
            FROM 
                rol 
            WHERE 
                id = '${id}'`);
        const rols = respuesta.rows[0];
        return rols;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('ROLEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getRolById = _getRolById;
const _updateEstadoRolById = (id, estado) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`UPDATE rol
            SET estado = ${estado}
            WHERE id = ${id}`);
        if (respuesta.rowCount > 0)
            return new response_model_1.ResponseModel('#UER01', 'Actulización exitosa.');
        return new response_model_1.ResponseModel('#UER02', 'No se encontró ningún registro para actualizar.');
    }
    catch (error) {
        logger_1.logger.error(`Error en updateEstadoRol:  ${error}`);
        throw (0, excepcion_1.NewExcepcion)('ROLEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateEstadoRolById = _updateEstadoRolById;
const _updateRolById = (id, rol) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`UPDATE rol
            SET rol = ${rol}
            WHERE id = ${id}`);
        if (respuesta.rowCount > 0)
            return new response_model_1.ResponseModel('#', 'Actulización exitosa.');
        return new response_model_1.ResponseModel('#UR02', 'No se encontró ningún registro para actualizar.');
    }
    catch (error) {
        logger_1.logger.error(`Error en updateRol:  ${error}`);
        throw (0, excepcion_1.NewExcepcion)('ROLEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateRolById = _updateRolById;
