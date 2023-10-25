import { NewExcepcion } from "../../excepcion/excepcion";
import { logger } from "../../logs/logger";
import { CotizacionProductoModel } from "../../models/model/cotizacion-producto.model";
import { ResponseModel } from "../../models/model/response.model";
import { conexion } from "../conexion";

const _insertCotizacionProducto = async ( id_cotizacion:string, id_producto:string ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                cotizacion_producto (id_cotizacion, id_producto) 
                VALUES ($1,$2)`, 
            [id_cotizacion, id_producto]
        );

        if(respuesta.rowCount === 1) {
        
            logger.info(`insert cotizacion_producto success`);
            return new ResponseModel('#','Se guardo correctamente cotizacion_producto.');
        }

        throw  NewExcepcion('INSERTROLEXCEPCION');
        
    } catch (error) {
        
        logger.error(`Error en insertCotizacionProducto:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #CP02`;
    } finally {

        consulta.end();
    }
}

const _getCotizacionProductoById = async ( id: string  ) => {

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
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getRolPermisoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #RP04";
    }finally {
        
        consulta.end();
    }
}

const _getCotizacionProductoByIdCotizacion = async ( id_rol: string  ) => {

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
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getCotizacionProductoByIdCotizacion:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #CP05";
    }finally {
        
        consulta.end();
    }
}

const _deleteCotizacionProductoById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM cotizacion_producto WHERE id = ${id}`
        );
        
        return respuesta.rows[0]? true:false;

    } catch (error) {
        
        logger.error(`Error en deleteCotizacionProductoById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #CP05";
    }finally {
        
        consulta.end();
    }
}

const _getCotizacionProductoByidCotizacionAndIdProducto = async (id_producto: string, id_cotizacion:string):Promise<boolean> => {
    
    const consulta = await conexion();
    
    try {

        const query = `SELECT * FROM cotizacion_producto WHERE id_producto = '${id_producto}' and id_cotizacion = ${id_cotizacion}`;
        
        const result = await consulta.query(query);

        return result.rows[0]? true:false;

    } catch (error) {

        logger.error('Error en _getCotizacionProductoByidCotizacionAndIdProducto:', error);
        throw NewExcepcion('GENERICO');
    } finally {
        
        consulta.end();
    }
};

export { 
    _insertCotizacionProducto, 
    _getCotizacionProductoById,
    _getCotizacionProductoByIdCotizacion,
    _deleteCotizacionProductoById,
    _getCotizacionProductoByidCotizacionAndIdProducto
};