import { conexion } from "./conexion"
import { logger } from "../logs/logger";
import { PermisoModel } from "../models/model/permiso.model";

const _insertPermiso = async ( {permiso, estado}:PermisoModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                permiso (permiso,estado) 
                VALUES ($1,$2)`, 
            [permiso,estado]
        );
        
    } catch (error) {
        
        logger.error(`Error en insertPermiso:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #P02`;
    } finally {

        consulta.end();
    }
}

const _getPermisoById = async ( id: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                permiso,
                estado
            FROM 
                permiso 
            WHERE 
                id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #P03";
    }finally {
        
        consulta.end();
    }
}

const _updateEstadoPermiso = async ( id:string, estado: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE permiso
            SET estado = ${estado}
            WHERE id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en updateEstadoPermiso:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #P04";
    }finally {
        
        consulta.end();
    }
}

const _updatePermiso = async ( id:string, permiso: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE permiso
            SET permiso = ${permiso}
            WHERE id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en updatePermiso:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #P05";
    }finally {
        
        consulta.end();
    }
}

export { 
    _insertPermiso, 
    _getPermisoById, 
    _updateEstadoPermiso, 
    _updatePermiso 
};