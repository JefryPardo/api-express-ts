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
exports._updateMarca = exports._getMarcaById = exports._insertMarca = exports._getAllMarca = void 0;
const logger_1 = require("../logs/logger");
const conexion_1 = require("./conexion");
const _getAllMarca = () => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`
                SELECT 
                    id, marca
                from marca
            `);
        const marcaList = respuesta.rows;
        logger_1.logger.info(`getAllMarca: se encontraron ${marcaList.length} marca`);
        return marcaList;
    }
    catch (error) {
        logger_1.logger.error(`Error en getAllMarca:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #M01`;
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getAllMarca = _getAllMarca;
const _insertMarca = (marca) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                marca(marca) 
                VALUES ($1,$2)`, [marca]);
    }
    catch (error) {
        logger_1.logger.error(`Error en insertMarca:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #M02`;
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertMarca = _insertMarca;
const _getMarcaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                marca
            FROM 
                marca 
            WHERE 
                id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getMarcaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #M03";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getMarcaById = _getMarcaById;
const _updateMarca = (id, marca) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`UPDATE marca
            SET marca = ${marca}
            WHERE id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en updateMarca:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #M05";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateMarca = _updateMarca;
