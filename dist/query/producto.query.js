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
exports._getAllProductos = exports._updateEstadoProducto = exports._updateProducto = exports._getProductoById = exports._insertProducto = void 0;
const conexion_1 = require("./conexion");
const excepcion_1 = require("../excepcion/excepcion");
const _insertProducto = (producto) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            INSERT INTO producto (
                nombre,
                descripcion,
                url_imagen,
                referencia,
                referencia_local,
                precio,
                ficha_tecnica,
                unidades,
                estado,
                categoria,
                tipo,
                marca
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
            )
        `;
        const values = [
            producto.nombre,
            producto.descripcion,
            producto.url_imagen,
            producto.referencia,
            producto.referencia_local,
            producto.precio,
            producto.ficha_tecnica,
            producto.unidades,
            producto.categoria,
            producto.tipo,
            producto.marca,
        ];
        const result = yield consulta.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_insertProducto', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._insertProducto = _insertProducto;
const _getProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = 'SELECT * FROM producto WHERE id = $1';
        const result = yield consulta.query(query, [id]);
        if (result.rowCount !== 1)
            throw (0, excepcion_1.NewExcepcion)('GENERICO');
        const producto = result.rows[0];
        return producto;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getProductoById', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getProductoById = _getProductoById;
const _updateProducto = (id, producto) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            UPDATE 
                producto
            SET 
                nombre = $1, 
                descripcion = $2, 
                url_imagen = $3, 
                referencia = $4,
                referencia_local = $5, 
                precio = $6, 
                ficha_tecnica = $7,
                unidades = $8, 
                estados = $9, 
                categoria = $10, 
                tipo = $11, 
                marca = $12
            WHERE 
                id = $13
        `;
        const values = [
            producto.nombre,
            producto.descripcion,
            producto.url_imagen,
            producto.referencia,
            producto.referencia_local,
            producto.precio,
            producto.ficha_tecnica,
            producto.unidades,
            producto.estado,
            producto.categoria,
            producto.tipo,
            producto.marca,
            id,
        ];
        const result = yield consulta.query(query, values);
        return result.rows;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_updateProducto', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateProducto = _updateProducto;
const _updateEstadoProducto = (id, estado) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const query = `
            UPDATE 
                producto
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
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_updateEstadoProducto', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._updateEstadoProducto = _updateEstadoProducto;
const _getAllProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield (0, conexion_1.conexion)();
    try {
        const respuesta = yield consulta.query(`
                SELECT 
                    id,
                    nombre,
                    descripcion,
                    url_imagen,
                    referencia,
                    referencia_local,
                    precio,
                    ficha_tecnica,
                    unidades,
                    estado,
                    categoria,
                    tipo,
                    marca
                from producto
            `);
        const productoList = respuesta.rows;
        return productoList;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', '_getAllProductos', error);
    }
    finally {
        (0, conexion_1.closeConnection)(consulta);
    }
});
exports._getAllProductos = _getAllProductos;
