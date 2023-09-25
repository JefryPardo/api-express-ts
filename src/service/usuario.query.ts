import { usuarioModel } from "../models/usuario.model";
import { conexion } from "./conexion"
import { logger } from "./../logs/logger";

const getAllUser = async ():Promise<usuarioModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
                SELECT 
                    nombre, apellido, tipo_documento, documento_identificacion, estado, sexo
                from usuario
            `
        );
        const usuariosList :usuarioModel[] = respuesta.rows; 

        logger.info(`getAllUser: se encontraron ${usuariosList.length} usuarios`);

        return usuariosList;

    } catch (error) {

        logger.error(`Error en getAllUser:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #U01`
    } finally {

        consulta.end();
    }
}

const insertUser = async ( usuario: usuarioModel ) => {

    const consulta = await conexion();
    try {
        
        const { nombre, apellido, tipo_documento, documento_identificacion, estado, sexo } = usuario;

        const respuesta = await consulta.query(
            `INSERT INTO 
                usuario (nombre, apellido, tipo_documento, documento_identificacion, estado, sexo) 
                VALUES ($1, $2, $3, $4, $5, $6)`, 
            [nombre, apellido, tipo_documento, documento_identificacion, estado, sexo]
        );
        
        console.log(respuesta);
        
    } catch (error) {
        
        logger.error(`Error en insertUser:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #U02`;
    } finally {

        consulta.end();
    }
}

const getUserById = async ( idUsuario: number  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT * FROM usuario WHERE id = ${idUsuario}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        throw "Error inesperado.";
    }finally {
        
        consulta.end();
    }
}


const getUserByDocumento = async ( documento: string  ) => {

    const consulta = await conexion();
    const respuesta = await consulta.query(
        `SELECT * FROM usuario WHERE documento_identificacion = '${documento}'`
    );
    
    console.log(respuesta);
    return respuesta.rows;
}

export { getAllUser, insertUser, getUserById, getUserByDocumento };