import { CotizacionModel } from "../models/model/cotizacion.model";
import { conexion } from "./conexion";

const _insertCotizacion = async (cotizacion: CotizacionModel) => {
    
    const consulta = await conexion();
    
    try {
    
        const query = `
            INSERT INTO cotizacion (
                fecha_creacion, 
                fecha_vencimiento, 
                nombre_cliente, 
                cedula_cliente, 
                correo_cliente, 
                id_usuario
            ) VALUES (
                $1, $2, $3, $4, $5, $6
            )
        `;
        
        const values = [
            cotizacion.fecha_creacion,
            cotizacion.fecha_vencimiento,
            cotizacion.nombre_cliente,
            cotizacion.cedula_cliente,
            cotizacion.correo_cliente,
            cotizacion.id_usuario
        ];

        const result = await consulta.query(query, values);

        return result.rows;

    } catch (error) {
        
        console.error('Error en insertCotizacion:', error);
        throw 'Error inesperado al insertar cotizacion.';
    }finally {
        
        consulta.end();
    }
};

const _getCotizacionByIdUsuario = async (id_usuario: string) => {
    
    const consulta = await conexion();
    
    try {
        
        const query = 'SELECT * FROM cotizacion WHERE id_usuario = $1';
        const result = await consulta.query(query, [id_usuario]);
        
        return result.rows[0];

    } catch (error) {

        console.error('Error en getCotizacionByIdUsuario:', error);
        throw 'Error inesperado al obtener cotizacion por ID.';
    } finally {
        
        consulta.end();
    }
};
  
const _updateCotizacion = async (id: string, cotizacion: CotizacionModel) => {
    
    const consulta = await conexion();
    
    try {
        const query = `
            UPDATE 
                cotizacion
            SET 
                fecha_creacion = $1, 
                fecha_vencimiento = $2, 
                nombre_cliente = $3, 
                cedula_cliente = $4,
                correo_cliente = $5, 
                id_usuario = $6,
            WHERE 
                id = $12
        `;
        
        const values = [
            cotizacion.fecha_creacion,
            cotizacion.fecha_vencimiento,
            cotizacion.nombre_cliente,
            cotizacion.cedula_cliente,
            cotizacion.correo_cliente,
            cotizacion.id_usuario,
            id,
        ];
        
        const result = await consulta.query(query, values);
        
        return result.rows;

    } catch (error) {

        console.error('Error en updateCotizacion:', error);
        throw 'Error inesperado al actualizar cotizacion.';
    } finally {
        
        consulta.end();
    }
};

export {
    _insertCotizacion,
    _getCotizacionByIdUsuario,
    _updateCotizacion
};