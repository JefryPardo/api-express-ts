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
exports._updateCategoria = exports._getCategoriaById = exports._insertCategoria = exports._getAllCategoria = void 0;
const conexion_1 = require("./conexion");
const logger_1 = require("../logs/logger");
const _getAllCategoria = () => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`
                SELECT 
                    id, categoria
                from categoria
            `);
        const categoriaList = respuesta.rows;
        logger_1.logger.info(`getAllCategoria: se encontraron ${categoriaList.length} categorias`);
        return categoriaList;
    }
    catch (error) {
        logger_1.logger.error(`Error en getAllCategoria:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #C01`;
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getAllCategoria = _getAllCategoria;
const _insertCategoria = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`INSERT INTO 
                categoria(categoria) 
                VALUES ($1,$2)`, [categoria]);
    }
    catch (error) {
        logger_1.logger.error(`Error en insertCategoria:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #C02`;
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertCategoria = _insertCategoria;
const _getCategoriaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`SELECT 
                id, 
                categoria
            FROM 
                categoria 
            WHERE 
                id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en getCategoriaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #C03";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getCategoriaById = _getCategoriaById;
const _updateCategoria = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, categoria }) {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`UPDATE categoria
            SET categoria = ${categoria}
            WHERE id = ${id}`);
        return respuesta.rows;
    }
    catch (error) {
        logger_1.logger.error(`Error en updateCategoria:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #C05";
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateCategoria = _updateCategoria;
