import { logger } from "../logs/logger";
import { GananciaModel } from "../models/model/ganancia.model";
import { conexion } from "./conexion";

const _insertGanancia = async ( {id_usuario, id_producto, porcentaje_ganancia}:GananciaModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                ganancia(id_usuario, id_producto, porcentaje_ganancia) 
                VALUES ($1,$2,$3)`, 
            [id_usuario, id_producto, porcentaje_ganancia]
        );
        
        console.log(respuesta);
        
    } catch (error) {
        
        logger.error(`Error en insertGanancia:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #G02`;
    } finally {

        consulta.end();
    }
}

const _getGananciaById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_usuario,
                id_categoria,
                porcentaje_ganancia
            FROM 
                ganancia 
            WHERE 
                id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getGananciaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G03";
    }finally {
        
        consulta.end();
    }
}

const _getGananciaByIdProducto = async ( id_producto: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_usuario,
                id_producto,
                porcentaje_ganancia
            FROM 
                ganancia 
            WHERE 
            id_producto = ${id_producto}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getGananciaByIdProducto:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G03";
    }finally {
        
        consulta.end();
    }
}

const _deleteGananciaById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM ganancia WHERE id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en deleteGananciaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G05";
    }finally {
        
        consulta.end();
    }
}

const _getGananciaByIdUsuario = async ( idUsuario: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_usuario,
                id_producto,
                porcentaje_ganancia
            FROM 
                ganancia 
            WHERE 
            id_usuario = ${idUsuario}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getGananciaByIdUsuario:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G04";
    }finally {
        
        consulta.end();
    }
}

const _updateGananciaById = async (id: string, porcentaje_ganancia: string) => {
    
    const consulta = await conexion();
    
    try {
        const query = `
            UPDATE 
                ganancia
            SET 
                porcentaje_ganancia = $1 
            WHERE 
                id = $2
        `;
        
        const values = [
            porcentaje_ganancia,
            id
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

export { 
    _insertGanancia, 
    _getGananciaById,
    _deleteGananciaById, 
    _getGananciaByIdUsuario,
    _updateGananciaById
};