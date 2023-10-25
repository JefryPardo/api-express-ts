import { CategoriaModel } from "../models/model/categoria.model";
import { conexion } from "./conexion";
import { logger } from "../logs/logger";


const _getAllCategoria = async ():Promise<CategoriaModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
                SELECT 
                    id, categoria
                from categoria
            `
        );

        const categoriaList :CategoriaModel[] = respuesta.rows; 
        logger.info(`getAllCategoria: se encontraron ${categoriaList.length} categorias`);

        return categoriaList;

    } catch (error) {

        logger.error(`Error en getAllCategoria:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #C01`
    } finally {

        consulta.end();
    }
}

const _insertCategoria = async ( categoria:string ) => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                categoria(categoria) 
                VALUES ($1,$2)`, 
            [categoria]
        );
        
    } catch (error) {
        
        logger.error(`Error en insertCategoria:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #C02`;
    } finally {

        consulta.end();
    }
}

const _getCategoriaById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                categoria
            FROM 
                categoria 
            WHERE 
                id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en getCategoriaById:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #C03";
    }finally {
        
        consulta.end();
    }
}

const _updateCategoria = async ( {id, categoria}: CategoriaModel ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `UPDATE categoria
            SET categoria = ${categoria}
            WHERE id = ${id}`
        );
        
        console.log(respuesta.rows);

        return respuesta.rows;

    } catch (error) {
        
        logger.error(`Error en updateCategoria:  ${error}`);
        throw "Error inesperado, por favor reportar al administrador. #C05";
    }finally {
        
        consulta.end();
    }
}

export { 
    _getAllCategoria,
    _insertCategoria,
    _getCategoriaById, 
    _updateCategoria 
};