import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { ResponseModel } from "../models/model/response.model";
import { TipoModel } from "../models/model/tipo.model";
import { conexion } from "./conexion";

const _getAllTipo = async ():Promise<ResponseModel> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
                SELECT 
                    id, 
                    tipo
                from tipo
            `
        );

        if(respuesta.rowCount < 1) {
        
            return new ResponseModel('#',[]);
        }

        const tipoList :TipoModel[] = respuesta.rows; 
        logger.info(`getAllTipo: se encontraron ${tipoList.length} tipos.`);

        return new ResponseModel('#',tipoList);

    } catch (error) {

        logger.error(`Error en _getAllTipo:  ${error}`);
        throw NewExcepcion('CONSULTAEXCEPCION');
    } finally {

        consulta.end();
    }
}

const _insertTipo = async ( tipo:string ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                tipo (tipo) 
                VALUES ($1)`, 
            [tipo]
        );
        
        if(respuesta.rowCount === 1) {
        
            logger.info(`insert tipo, ${tipo} success`);
            return new ResponseModel('#','Se guardo correctamente el tipo.');
        }
        throw 'algo salido mal';
        
    } catch (error) {
        
        logger.error(`Error en _insertTipo:  ${error}`);
        throw NewExcepcion('CONSULTAEXCEPCION');

    } finally {

        consulta.end();
    }
}

const _getTipoById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                tipo
            FROM 
                tipo 
            WHERE 
                id = '${id}'`
        );
        
        if(respuesta.rowCount !== 1) {
        
            return new ResponseModel('#','Consulta sin resultados');
        }

        const tipo :TipoModel = respuesta.rows[0]; 

        return new ResponseModel('#',tipo);

    } catch (error) {
        
        logger.error(`Error en getTipoById:  ${error}`);
        throw NewExcepcion('CONSULTAEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

const _updateTipoById = async ( {id, tipo}: TipoModel ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE tipo
            SET tipo = ${tipo}
            WHERE id = ${id}`
        );
        
        if(respuesta.rowCount > 0) return new ResponseModel('#','Actulización exitosa.');
        return new ResponseModel('#','No se encontró ningún registro para actualizar.');

    } catch (error) {
        
        logger.error(`Error en updateTipo:  ${error}`);
        throw NewExcepcion('CONSULTAEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

export { 
    _getAllTipo, 
    _insertTipo,
    _getTipoById, 
    _updateTipoById 
};