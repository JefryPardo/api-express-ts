import { logger } from "../../logs/logger";
import { CotizacionProductoModel } from "../../models/model/cotizacion-producto.model";
import { conexion } from "../conexion";

const insertCotizacionProducto = async ( { id_cotizacion, id_producto }:CotizacionProductoModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                cotizacion_producto (id_cotizacion, id_producto) 
                VALUES ($1,$2)`, 
            [id_cotizacion, id_producto]
        );
        
        console.log(respuesta);
        
    } catch (error) {
        
        logger.error(`Error en insertCotizacionProducto:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #CP02`;
    } finally {

        consulta.end();
    }
}

const getCotizacionProductoById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_producto,
                id_cotizacion
            FROM 
                cotizacion_producto 
            WHERE 
                id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getRolPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP04";
    }finally {
        
        consulta.end();
    }
}

const getCotizacionProductoByIdCotizacion = async ( id_rol: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_producto,
                id_cotizacion
            FROM 
                cotizacion_producto
            WHERE 
                id_cotizacion = ${id_rol}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getCotizacionProductoByIdCotizacion:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #CP05";
    }finally {
        
        consulta.end();
    }
}

const deleteCotizacionProductoById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM cotizacion_producto WHERE id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en deleteCotizacionProductoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #CP05";
    }finally {
        
        consulta.end();
    }
}

export { 
    insertCotizacionProducto, 
    getCotizacionProductoById,
    getCotizacionProductoByIdCotizacion,
    deleteCotizacionProductoById
};