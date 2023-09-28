import { logger } from "../logs/logger";
import { GananciaModel } from "../models/model/ganancia.model";
import { conexion } from "./conexion";

const insertGanancia = async ( {id_usuario, id_categoria, porcentaje_ganancia}:GananciaModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                ganancia(id_usuario, id_categoria, porcentaje_ganancia) 
                VALUES ($1,$2,$3)`, 
            [id_usuario, id_categoria, porcentaje_ganancia]
        );
        
        console.log(respuesta);
        
    } catch (error) {
        
        logger.error(`Error en insertGanancia:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #G02`;
    } finally {

        consulta.end();
    }
}

const getGananciaById = async ( id: string  ) => {

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

const deleteGananciaById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM ganancia WHERE id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en deleteGananciaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #G05";
    }finally {
        
        consulta.end();
    }
}

const getGananciaByIdUsuario = async ( idUsuario: string  ) => {

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

export { 
    insertGanancia, 
    getGananciaById,
    deleteGananciaById, 
    getGananciaByIdUsuario 
};