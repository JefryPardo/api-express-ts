import { conexion } from "./conexion"
import { logger } from "../logs/logger";
import { RolModel } from "../models/model/rol.model";
import { NewExcepcion } from "../excepcion/excepcion";
import { Excepcion } from "../excepcion/class/query.excepcion";
import { ResponseModel } from "../models/model/response.model";

const _getAllRols = async ():Promise<ResponseModel> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
                SELECT 
                    id, 
                    rol, 
                    estado
                from rol
            `
        );

        if(respuesta.rowCount < 1) {
        
            return new ResponseModel('#GR01',[]);
        }

        const rolList :RolModel[] = respuesta.rows; 
        logger.info(`getAllRols: se encontraron ${rolList.length} roles`);

        return new ResponseModel('#GAR01',rolList);

    } catch (error) {

        logger.error(`Error en getAllRols:  ${error}`);
        throw NewExcepcion('ROLEXCEPCION');
    } finally {

        consulta.end();
    }
}

const _insertRol = async ( {rol, estado}:RolModel ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                rol (rol,estado) 
                VALUES ($1,$2)`, 
            [rol,estado]
        );
        
        if(respuesta.rowCount === 1) {
        
            logger.info(`insert rol, ${rol} success`);
            return new ResponseModel('#IR01','Se guardo correctamente el rol.');
        }

        throw  NewExcepcion('INSERTROLEXCEPCION');
        
    } catch (error) {
        
        logger.error(`Error en _insertRol:  ${error}`);
        
        if (error instanceof Excepcion) {
        
            throw error;
        }

        throw NewExcepcion('ROLEXCEPCION');

    } finally {

        consulta.end();
    }
}

const _getRolByIds = async ( ids: string[]  ) => {

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
                id IN ($1)`,
            [ids]
        );

        const rols :RolModel[] = respuesta.rows; 

        return rols;

    } catch (error) {
        
        logger.error(`Error en getRolByIds:  ${error}`);
        throw NewExcepcion('ROLEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

const _updateEstadoRolById = async ( id:string, estado: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE rol
            SET estado = ${estado}
            WHERE id = ${id}`
        );
        
        if(respuesta.rowCount > 0) return new ResponseModel('#UER01','Actulización exitosa.');
        return new ResponseModel('#UER02','No se encontró ningún registro para actualizar.');

    } catch (error) {
        
        logger.error(`Error en updateEstadoRol:  ${error}`);
        throw NewExcepcion('ROLEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

const _updateRolById = async ( id:string, rol: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE rol
            SET rol = ${rol}
            WHERE id = ${id}`
        );
        
        if(respuesta.rowCount > 0) return new ResponseModel('#','Actulización exitosa.');
        return new ResponseModel('#UR02','No se encontró ningún registro para actualizar.');

    } catch (error) {
        
        logger.error(`Error en updateRol:  ${error}`);
        throw NewExcepcion('ROLEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

export { 
    _getAllRols, 
    _insertRol,
    _getRolByIds, 
    _updateEstadoRolById, 
    _updateRolById
};