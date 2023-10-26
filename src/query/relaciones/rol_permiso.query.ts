import { logger } from "../../logs/logger";
import { RolPermisoModel } from "../../models/model/rol-permiso.model";
import { conexion } from "../conexion";

const insertRolPermiso = async ( {id_rol, id_permiso}:RolPermisoModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                rol_permiso (id_rol,id_permiso) 
                VALUES ($1,$2)`, 
            [id_rol, id_permiso]
        );
        
    } catch (error) {
        
        logger.error(`Error en insertRolPermiso:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #RP02`;
    } finally {

        consulta.end();
    }
}

const getRolPermisoById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_rol,
                id_permiso
            FROM 
                rol_permiso 
            WHERE 
                id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getRolPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP04";
    }finally {
        
        consulta.end();
    }
}

const getRolPermisoByIdRol = async ( id_rol: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_rol,
                id_permiso
            FROM 
                rol_permiso
            WHERE 
                id_rol = ${id_rol}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getRolPermisoByIdRol:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP05";
    }finally {
        
        consulta.end();
    }
}

const deleteRolPermisoById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM rol_permiso WHERE id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en deleteRolPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP05";
    }finally {
        
        consulta.end();
    }
}

export { 
    insertRolPermiso, 
    getRolPermisoById,
    getRolPermisoByIdRol,
    deleteRolPermisoById
};