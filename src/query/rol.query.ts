import { conexion } from "./conexion"
import { logger } from "../logs/logger";
import { RolModel } from "../models/model/rol.model";

const getAllRols = async ():Promise<RolModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
                SELECT 
                    id, rol
                from rol
            `
        );

        const rolList :RolModel[] = respuesta.rows; 
        logger.info(`getAllRols: se encontraron ${rolList.length} roles`);

        return rolList;

    } catch (error) {

        logger.error(`Error en getAllRols:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #R01`
    } finally {

        consulta.end();
    }
}

const insertRol = async ( {rol, estado}:RolModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                rol (rol,estado) 
                VALUES ($1,$2)`, 
            [rol,estado]
        );
        
        console.log(respuesta);
        
    } catch (error) {
        
        logger.error(`Error en insertRol:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #R02`;
    } finally {

        consulta.end();
    }
}

const getRolById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                rol,
                estado
            FROM 
                rol 
            WHERE 
                id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getRolById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #R03";
    }finally {
        
        consulta.end();
    }
}

const updateEstadoRol = async ( id:string, estado: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE rol
            SET estado = ${estado}
            WHERE id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en updateEstadoRol:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #R04";
    }finally {
        
        consulta.end();
    }
}

const updateRol = async ( id:string, rol: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE rol
            SET rol = ${rol}
            WHERE id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en updateRol:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #R05";
    }finally {
        
        consulta.end();
    }
}

export { 
    getAllRols, 
    insertRol,
    getRolById, 
    updateEstadoRol, 
    updateRol
};