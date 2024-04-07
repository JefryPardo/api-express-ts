import { NewExcepcion } from "../../excepcion/excepcion";
import { CotizacionProductoModel } from "../../models/model/cotizacion-producto.model";
import { closeConnection, conexion } from "../conexion";

const _insertCotizacionProducto = async ( cantidad:string, id_cotizacion:string, id_producto:string ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO cotizacion_producto (cantidad,id_cotizacion, id_producto) VALUES ('${cantidad}','${id_cotizacion}','${id_producto}')`
        );

        return (respuesta.rowCount === 1)
        
    } catch (error) {
        
        throw NewExcepcion('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    } finally {
        closeConnection(consulta);
    }
}

const _getCotizacionProductoById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                cantidad,
                id_producto,
                id_cotizacion
            FROM 
                cotizacion_producto 
            WHERE 
                id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        throw NewExcepcion('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }finally {
        closeConnection(consulta);
    }
}

const _getCotizacionProductoByIdCotizacion = async ( id_rol: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                cantidad,
                id_producto,
                id_cotizacion
            FROM 
                cotizacion_producto
            WHERE 
                id_cotizacion = '${id_rol}'`
        );
        
        const cotizacion_list :CotizacionProductoModel[] = respuesta.rows; 
        return cotizacion_list;

    } catch (error) {
        
        throw NewExcepcion('FATALERROR','_getCotizacionById',error);
    }finally {
        closeConnection(consulta);
    }
}

const _deleteCotizacionProductoByIds = async ( id_cotizacion: string, id_producto: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM cotizacion_producto WHERE id_cotizacion = '${id_cotizacion}' and id_producto = '${id_producto}'`
        );
        
        if (respuesta.rowCount > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        
        throw NewExcepcion('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }finally {
        closeConnection(consulta);
    }
}

const _getCotizacionProductoByidCotizacionAndIdProducto = async (id_producto: string, id_cotizacion:string):Promise<boolean> => {
    
    const consulta = await conexion();
    
    try {

        const query = `SELECT * FROM cotizacion_producto WHERE id_producto = '${id_producto}' and id_cotizacion = '${id_cotizacion}'`;
        
        const result = await consulta.query(query);
        return result.rows[0]? true:false;

    } catch (error) {

        throw NewExcepcion('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    } finally {
        closeConnection(consulta);
    }
};

const _updateCotizacionProducto = async ( id:string, cantidad:string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE cotizacion_producto
            SET cantidad = '${cantidad}'
            WHERE id = ${id}`
        );
        
        if (respuesta.rowCount === 1) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        
        throw NewExcepcion('FATALERROR', '_getDisponibilidadUsuarioByUsuario', error);
    }finally {
        closeConnection(consulta);
    }
}

export { 
    _insertCotizacionProducto, 
    _getCotizacionProductoById,
    _getCotizacionProductoByIdCotizacion,
    _deleteCotizacionProductoByIds,
    _getCotizacionProductoByidCotizacionAndIdProducto,
    _updateCotizacionProducto
};