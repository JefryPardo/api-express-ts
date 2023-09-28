import { logger } from "../../logs/logger";
import { UsuarioRolModel } from "../../models/model/usuario-rol.model";
import { conexion } from "../conexion";

const insertUsuarioRol = async ( {id_usuario, id_rol}:UsuarioRolModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                usuario_rol (id_usuario,id_rol) 
                VALUES ($1,$2)`, 
            [id_usuario,id_rol]
        );
        
        console.log(respuesta);
        
    } catch (error) {
        
        logger.error(`Error en insertUsuarioRol:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #UR02`;
    } finally {

        consulta.end();
    }
}

const getUsuarioRolById = async ( id: string  ) => {

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
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getUsuarioRolById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #UR04";
    }finally {
        
        consulta.end();
    }
}

const getUsuarioRolByIdUsuario = async ( id_usuario: string  ) => {

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
                id_usuario = ${id_usuario}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getUsuarioRolByIdUsuario:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #UR05";
    }finally {
        
        consulta.end();
    }
}

const deleteUsuarioRolById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM usuario_rol WHERE id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en deleteUsuarioRolById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #UR05";
    }finally {
        
        consulta.end();
    }
}

export { 
    insertUsuarioRol, 
    getUsuarioRolById,
    deleteUsuarioRolById,
    getUsuarioRolByIdUsuario
};