import { conexion } from "./conexion"
import { logger } from "../logs/logger";
import { ProductoModel } from "../models/model/producto.model";
import { NewExcepcion } from "../excepcion/excepcion";

const _insertProducto = async (producto: ProductoModel) => {
    
    const consulta = await conexion();
    
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
                id_categoria,
                id_tipo,
                id_marca
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
            producto.id_categoria,
            producto.id_tipo,
            producto.id_marca,
        ];

        const result = await consulta.query(query, values);

        return result.rows;

    } catch (error) {
        
        throw NewExcepcion('FATALERROR','_insertProducto',error);
    }finally {
        
        consulta.end();
    }
};

const _getProductoById = async (id: string) => {
    
    const consulta = await conexion();
    
    try {
        
        const query = 'SELECT * FROM producto WHERE id = $1';
        const result = await consulta.query(query, [id]);
        
        if(result.rowCount !== 1) throw NewExcepcion('GENERICO');

        const producto :ProductoModel = result.rows[0]; 

        return producto;

    } catch (error) {

        throw NewExcepcion('FATALERROR','_getProductoById',error);
    } finally {
        
        consulta.end();
    }
};
  
const _updateProducto = async (id: string, producto: ProductoModel) => {
    
    const consulta = await conexion();
    
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
                id_categoria = $10, 
                id_tipo = $11, 
                id_marca = $12
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
            producto.id_categoria,
            producto.id_tipo,
            producto.id_marca,
            id,
        ];
        
        const result = await consulta.query(query, values);
        
        return result.rows;

    } catch (error) {

        throw NewExcepcion('FATALERROR','_updateProducto',error);
    } finally {
        
        consulta.end();
    }
};

const _updateEstadoProducto = async (id: string, estado: 'activo' | 'inactivo') => {
    
    const consulta = await conexion();
    
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
        
        const result = await consulta.query(query, values);
        
        return result.rows;

    } catch (error) {

        throw NewExcepcion('FATALERROR','_updateEstadoProducto',error);
    } finally {
        
        consulta.end();
    }
};

const _getAllProductos = async ():Promise<ProductoModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
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
                    id_categoria,
                    id_tipo,
                    id_marca
                from producto
            `
        );

        const productoList :ProductoModel[] = respuesta.rows; 

        return productoList;

    } catch (error) {

        throw NewExcepcion('FATALERROR','_getAllProductos',error);
    } finally {

        consulta.end();
    }
}

export {
    _insertProducto,
    _getProductoById,
    _updateProducto,
    _updateEstadoProducto,
    _getAllProductos
};