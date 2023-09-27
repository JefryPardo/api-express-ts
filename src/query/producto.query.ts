import { conexion } from "./conexion"
import { logger } from "../logs/logger";
import { ProductoModel } from "../models/model/producto.model";

const insertProducto = async (producto: ProductoModel) => {
    
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
                id_categoria,
                id_tipo,
                id_marca
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
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
        
        console.error('Error en insertProducto:', error);
        throw 'Error inesperado al insertar producto.';
    }finally {
        
        consulta.end();
    }
};

const getProductoById = async (id: string) => {
    
    const consulta = await conexion();
    
    try {
        
        const query = 'SELECT * FROM producto WHERE id = $1';
        const result = await consulta.query(query, [id]);
        
        return result.rows[0];

    } catch (error) {

        console.error('Error en getProductoById:', error);
        throw 'Error inesperado al obtener producto por ID.';
    } finally {
        
        consulta.end();
    }
};
  
const updateProducto = async (id: string, producto: ProductoModel) => {
    
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
                id_categoria = $9, 
                id_tipo = $10, 
                id_marca = $11
            WHERE 
                id = $12
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
            id,
        ];
        
        const result = await consulta.query(query, values);
        
        return result.rows;

    } catch (error) {

        console.error('Error en updateUsuario:', error);
        throw 'Error inesperado al actualizar usuario.';
    } finally {
        
        consulta.end();
    }
};

const updateEstadoProducto = async (id: string, estado: 'activo' | 'inactivo') => {
    
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

        console.error('Error en updateEstadoProducto:', error);
        throw 'Error inesperado al actualizar el estado del producto.';
    } finally {
        
        consulta.end();
    }
};

export {
    insertProducto,
    getProductoById,
    updateProducto,
    updateEstadoProducto
};