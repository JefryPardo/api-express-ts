import { logger } from "../logs/logger";
import { UsuarioModel } from "../models/model/usuario.model";
import { conexion } from "./conexion"

const _insertUsuario = async (usuario: UsuarioModel) => {
    
    const consulta = await conexion();
    
    try {
    
        const query = `
            INSERT INTO usuario (
                nombre, 
                apellido, 
                direccion, 
                celular, 
                fecha_creacion,
                intentos_fallidos, 
                clave, 
                usuario, 
                estado
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            )
        `;
        
        const values = [
            usuario.nombre,
            usuario.apellido,
            usuario.direccion,
            usuario.celular,
            usuario.fecha_creacion,
            usuario.intentos_fallidos,
            usuario.clave,
            usuario.usuario,
            usuario.estado,
        ];

        const result = await consulta.query(query, values);

        return (result.rowCount === 1);

    } catch (error) {
        
        logger.error('Error en insertUsuario:', error);
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

        logger.error('Error en getUsuarioById:', error);
        throw 'Error inesperado al obtener usuario por ID.';
    } finally {
        
        consulta.end();
    }
};

const _getDisponibilidadUsuarioByUsuario = async (usuario: string) => {
    
    const consulta = await conexion();
    
    try {

        console.log(usuario);
        
        const query = `SELECT * FROM usuario WHERE usuario = '${usuario}'`;
        
        const result = await consulta.query(query);

        console.log(result);
        
        return result.rows[0]? true:false;

    } catch (error) {

        logger.error('usuario:', usuario);
        logger.error('Error en _getDisponibilidadUsuarioByUsuario:', error);
        throw 'Error inesperado al obtener usuario por ID.';
    } finally {
        
        consulta.end();
    }
};

const _getUsuarioByUsuario = async (usuario: string):Promise<UsuarioModel> => {
    
    const consulta = await conexion();
    
    try {

        
        const query = `SELECT * FROM usuario WHERE usuario = '${usuario}'`;
        const result = await consulta.query(query);
        
        let response:UsuarioModel = new UsuarioModel(); 

        if(result.rows[0]){
            
            response = result.rows[0]; 
            return response;
        }

        return response;        

    } catch (error) {

        logger.error('Error en getUsuarioById:', error);
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
                fecha_creacion = $5,
                intentos_fallidos = $6, 
                clave = $7, 
                usuario = $8, 
                estado = $9
            WHERE 
                id = $10
        `;
        
        const values = [
            usuario.nombre,
            usuario.apellido,
            usuario.direccion,
            usuario.celular,
            usuario.fecha_creacion,
            usuario.intentos_fallidos,
            usuario.clave,
            usuario.usuario,
            usuario.estado,
            id,
        ];
        
        const result = await consulta.query(query, values);
        
        return result.rows;

    } catch (error) {

        logger.error('Error en updateUsuario:', error);
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

        logger.error('Error en updateEstadoUsuario:', error);
        throw 'Error inesperado al actualizar el estado del usuario.';
    } finally {
        
        consulta.end();
    }
};
  
export { 
    _insertUsuario, 
    _getUsuarioById, 
    _updateUsuario,
    _updateEstadoUsuario,
    _getDisponibilidadUsuarioByUsuario,
    _getUsuarioByUsuario
};