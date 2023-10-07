import { UsuarioModel } from "../models/model/usuario.model";
import { conexion } from "./conexion"
import { logger } from "../logs/logger";

const _insertUsuario = async (usuario: UsuarioModel) => {
    
    const consulta = await conexion();
    
    try {
    
        const query = `
            INSERT INTO usuario (
                nombre, 
                apellido, 
                direccion, 
                celular, 
                token, 
                secret, 
                fecha_creacion,
                intentos_fallidos, 
                clave, 
                login, 
                activo
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            )
        `;
        
        const values = [
            usuario.nombre,
            usuario.apellido,
            usuario.direccion,
            usuario.celular,
            usuario.token,
            usuario.secret,
            usuario.fecha_creacion,
            usuario.intentos_fallidos,
            usuario.clave,
            usuario.login,
            usuario.activo,
        ];

        const result = await consulta.query(query, values);

        return result.rows;

    } catch (error) {
        
        console.error('Error en insertUsuario:', error);
        throw 'Error inesperado al insertar usuario.';
    }finally {
        
        consulta.end();
    }
};

const _getUsuarioById = async (id: string) => {
    
    const consulta = await conexion();
    
    try {
        
        const query = 'SELECT * FROM usuario WHERE id = $1';
        const result = await consulta.query(query, [id]);
        
        return result.rows[0];

    } catch (error) {

        console.error('Error en getUsuarioById:', error);
        throw 'Error inesperado al obtener usuario por ID.';
    } finally {
        
        consulta.end();
    }
};
  
const _updateUsuario = async (id: string, usuario: UsuarioModel) => {
    
    const consulta = await conexion();
    
    try {
        const query = `
            UPDATE 
                usuario
            SET 
                nombre = $1, 
                apellido = $2, 
                direccion = $3, 
                celular = $4,
                token = $5, 
                secret = $6, 
                fecha_creacion = $7,
                intentos_fallidos = $8, 
                clave = $9, 
                login = $10, 
                activo = $11
            WHERE 
                id = $12
        `;
        
        const values = [
            usuario.nombre,
            usuario.apellido,
            usuario.direccion,
            usuario.celular,
            usuario.token,
            usuario.secret,
            usuario.fecha_creacion,
            usuario.intentos_fallidos,
            usuario.clave,
            usuario.login,
            usuario.activo,
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

const _updateEstadoUsuario = async (id: string, estado: 'activo' | 'inactivo') => {
    
    const consulta = await conexion();
    
    try {
        const query = `
            UPDATE 
                usuario
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

        console.error('Error en updateEstadoUsuario:', error);
        throw 'Error inesperado al actualizar el estado del usuario.';
    } finally {
        
        consulta.end();
    }
};
  
export { 
    _insertUsuario, 
    _getUsuarioById, 
    _updateUsuario,
    _updateEstadoUsuario
};