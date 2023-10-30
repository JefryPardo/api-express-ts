import { NewExcepcion } from "../excepcion/excepcion";
import { UsuarioModel } from "../models/model/usuario.model";
import { conexion } from "./conexion"

const _insertUsuario = async (usuario: UsuarioModel):Promise<UsuarioModel> => {
    
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

        if (result.rowCount === 1) {
            
            const usuarioResp: UsuarioModel | null = await _getUsuarioByUsuario(usuario.usuario);
            
            if(usuarioResp == null) throw 'valor no esperado.';
            
            return usuarioResp;
        }
        
        throw 'respuesta no esperada.';

    } catch (error) {
        
        throw NewExcepcion('FATALERROR', '_insertUsuario', error);
    }finally {
        
        consulta.end();
    }
};

const _getUsuarioById = async (id: string) => {
    
    const consulta = await conexion();
    
    try {
        
        const query = `SELECT * FROM usuario WHERE id = '${id}'`;
        const result = await consulta.query(query);
        
        let response:UsuarioModel = new UsuarioModel(); 

        if(result.rows[0]){
            
            response = result.rows[0]; 
            return response;
        }

        return response; 

    } catch (error) {

        throw NewExcepcion('FATALERROR', '_getUsuarioById', error);
    } finally {
        
        consulta.end();
    }
};

const _getDisponibilidadUsuarioByUsuario = async (usuario: string) => {
    
    const consulta = await conexion();
    
    try {

        const query = `SELECT * FROM usuario WHERE usuario = '${usuario}'`;
        
        const result = await consulta.query(query);

        return result.rows[0]? true:false;

    } catch (error) {

        throw NewExcepcion('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    } finally {
        
        consulta.end();
    }
};

const _getUsuarioByUsuario = async (usuario: string):Promise<UsuarioModel | null> => {
    
    const consulta = await conexion();
    
    try {
        
        const query = `SELECT * FROM usuario WHERE usuario = '${usuario}'`;

        const result = await consulta.query(query);
        
        if(result.rows[0]){
            
            const response:UsuarioModel = result.rows[0]; 
            return response;
        }
        
        return null;
        
    } catch (error) {
        
        throw NewExcepcion('FATALERROR', '_getUsuarioByUsuario', error);
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

        throw NewExcepcion('FATALERROR', '_updateUsuario', error);
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

        throw NewExcepcion('FATALERROR', '_updateEstadoUsuario', error);
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