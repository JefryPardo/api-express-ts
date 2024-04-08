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
exports._updateTipoById = exports._getTipoById = exports._insertTipo = exports._getAllTipo = void 0;
const excepcion_1 = require("../excepcion/excepcion");
const logger_1 = require("../logs/logger");
const response_model_1 = require("../models/model/response.model");
const conexion_1 = require("./conexion");
const _getAllTipo = () => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`
                SELECT 
                    id, 
                    tipo
                from tipo
            `);
        if (respuesta.rowCount < 1) {
            return new response_model_1.ResponseModel('#', []);
        }
        const tipoList = respuesta.rows;
        logger_1.logger.info(`getAllTipo: se encontraron ${tipoList.length} tipos.`);
        return new response_model_1.ResponseModel('#', tipoList);
    }
    catch (error) {
        logger_1.logger.error(`Error en _getAllTipo:  ${error}`);
        throw (0, excepcion_1.NewExcepcion)('CONSULTAEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getAllTipo = _getAllTipo;
const _insertTipo = (tipo) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                tipo (tipo) 
                VALUES ($1)`, [tipo]);
        if (respuesta.rowCount === 1) {
            logger_1.logger.info(`insert tipo, ${tipo} success`);
            return new response_model_1.ResponseModel('#', 'Se guardo correctamente el tipo.');
        }
        throw 'algo salido mal';
    }
    catch (error) {
        logger_1.logger.error(`Error en _insertTipo:  ${error}`);
        throw (0, excepcion_1.NewExcepcion)('CONSULTAEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertTipo = _insertTipo;
const _getTipoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                tipo
            FROM 
                tipo 
            WHERE 
                id = '${id}'`);
        if (respuesta.rowCount !== 1) {
            return new response_model_1.ResponseModel('#', 'Consulta sin resultados');
        }
        const tipo = respuesta.rows[0];
        return new response_model_1.ResponseModel('#', tipo);
    }
    catch (error) {
        logger_1.logger.error(`Error en getTipoById:  ${error}`);
        throw (0, excepcion_1.NewExcepcion)('CONSULTAEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getTipoById = _getTipoById;
const _updateTipoById = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, tipo }) {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`UPDATE tipo
            SET tipo = ${tipo}
            WHERE id = ${id}`);
        if (respuesta.rowCount > 0)
            return new response_model_1.ResponseModel('#', 'Actulización exitosa.');
        return new response_model_1.ResponseModel('#', 'No se encontró ningún registro para actualizar.');
    }
    catch (error) {
        logger_1.logger.error(`Error en updateTipo:  ${error}`);
        throw (0, excepcion_1.NewExcepcion)('CONSULTAEXCEPCION');
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateTipoById = _updateTipoById;
