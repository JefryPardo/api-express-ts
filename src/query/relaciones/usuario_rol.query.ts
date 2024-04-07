import { NewExcepcion } from "../../excepcion/excepcion";
import { ResponseModel } from "../../models/model/response.model";
import { RolModel } from "../../models/model/rol.model";
import { UsuarioRolModel } from "../../models/model/usuario-rol.model";
import { closeConnection, conexion } from "../conexion";

const _insertUsuarioRol = async ( id_usuario:string, id_rol:string ):Promise<boolean> => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                usuario_rol (id_usuario,id_rol) 
                VALUES ($1,$2)`, 
            [id_usuario,id_rol]
        );

        if (respuesta.rowCount === 1) return true;
        
        throw 'respuesta no esperada.'
        
    } catch (error) {
        
        throw NewExcepcion('FATALERROR','_insertUsuarioRol',error);
    } finally {
        closeConnection(consulta);
    }
}

const _getUsuarioRolById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_usuario,
                id_rol
            FROM 
                usuario_rol 
            WHERE 
                id = ${id}`
        );
        
        if(respuesta.rowCount < 1) {
        
            return new ResponseModel('#',[]);
        }

        const rolList :RolModel[] = respuesta.rows; 
        return rolList;

    } catch (error) {
        
        throw NewExcepcion('FATALERROR', '_getUsuarioRolById',error);
    }finally {
        closeConnection(consulta);
    }
}

const _getUsuarioRolByIdUsuario = async ( id_usuario: string  ):Promise<UsuarioRolModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_usuario,
                id_rol
            FROM 
                usuario_rol 
            WHERE 
                id_usuario = '${id_usuario}'`
        );

        const id_rol_list:UsuarioRolModel[] = respuesta.rows; 

        return id_rol_list;

    } catch (error) {
        
        throw NewExcepcion('FATALERROR','_getUsuarioRolByIdUsuario',error);
    }finally {
        closeConnection(consulta);
    }
}

const _deleteUsuarioRolById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM usuario_rol WHERE id = ${id}`
        );

        if (respuesta.rowCount > 0) return true;

        return 'No se encontró ningún registro para eliminar';
        
    } catch (error) {
        
        throw NewExcepcion('FATALERROR','_deleteUsuarioRolById',error);
    }finally {
        closeConnection(consulta);
    }
}

export { 
    _insertUsuarioRol, 
    _getUsuarioRolById,
    _deleteUsuarioRolById,
    _getUsuarioRolByIdUsuario
};