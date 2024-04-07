import { logger } from "../logs/logger";
import { MarcaModel } from "../models/model/marca.model";
import { closeConnection, conexion } from "./conexion";


const _getAllMarca = async ():Promise<MarcaModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
                SELECT 
                    id, marca
                from marca
            `
        );

        const marcaList :MarcaModel[] = respuesta.rows; 
        logger.info(`getAllMarca: se encontraron ${marcaList.length} marca`);

        return marcaList;

    } catch (error) {

        logger.error(`Error en getAllMarca:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #M01`
    } finally {
        closeConnection(consulta);
    }
}

const _insertMarca = async ( marca:string ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                marca(marca) 
                VALUES ($1,$2)`, 
            [marca]
        );
        
        
    } catch (error) {
        
        logger.error(`Error en insertMarca:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #M02`;
    } finally {
        closeConnection(consulta);
    }
}

const _getMarcaById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                marca
            FROM 
                marca 
            WHERE 
                id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getMarcaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #M03";
    }finally {
        closeConnection(consulta);
    }
}

const _updateMarca = async ( id:string, marca: string ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE marca
            SET marca = ${marca}
            WHERE id = ${id}`
        );
        
        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en updateMarca:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #M05";
    }finally {
        closeConnection(consulta);
    }
}

export { 
    _getAllMarca,
    _insertMarca,
    _getMarcaById, 
    _updateMarca 
};