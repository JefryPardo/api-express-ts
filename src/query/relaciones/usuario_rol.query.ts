import { NewExcepcion } from "../../excepcion/excepcion";
import { logger } from "../../logs/logger";
import { ResponseModel } from "../../models/model/response.model";
import { RolModel } from "../../models/model/rol.model";
import { UsuarioRolModel } from "../../models/model/usuario-rol.model";
import { conexion } from "../conexion";

const _insertUsuarioRol = async ( id_usuario:string, id_rol:string ):Promise<boolean> => {

    const consulta = await conexion();

    try {
        
        const respuesta = await consulta.query(
            `INSERT INTO 
                usuario_rol (id_usuario,id_rol) 
                VALUES ($1,$2)`, 
            [id_usuario,id_rol]
        );

        if (respuesta.rowCount === 1) return true;
        
        throw NewExcepcion('INSERTUSUARIOROLEXCEPCION');
        
    } catch (error) {
        
        logger.error(`Error en insertUsuarioRol:  ${error}`);
        throw NewExcepcion('USUARIOROLCONSULTAEXCEPCION');
    } finally {

        consulta.end();
    }
}

const _getUsuarioRolById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_usuario,
                id_rol
            FROM 
                usuario_rol 
            WHERE 
                id = ${id}`
        );
        
        if(respuesta.rowCount < 1) {
        
            return new ResponseModel('#',[]);
        }

        const rolList :RolModel[] = respuesta.rows; 
        logger.info(`getUsuarioRolById: se encontraron ${rolList.length} RolById`);

        return rolList;

    } catch (error) {
        
        logger.error(`Error en getUsuarioRolById:  ${error}`);
        throw NewExcepcion('USUARIOROLCONSULTAEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

const _getUsuarioRolByIdUsuario = async ( id_usuario: string  ):Promise<UsuarioRolModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `SELECT 
                id, 
                id_usuario,
                id_rol
            FROM 
                usuario_rol 
            WHERE 
                id_usuario = '${id_usuario}'`
        );

        const id_rol_list:UsuarioRolModel[] = respuesta.rows; 
        logger.info(`id_rol_list: se encontraron ${id_rol_list.length} id_rol_list`);

        return id_rol_list;

    } catch (error) {
        
        logger.error(`Error en getUsuarioRolByIdUsuario:  ${error}`);
        throw NewExcepcion('USUARIOROLCONSULTAEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

const _deleteUsuarioRolById = async ( id: string  ) => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `DELETE FROM usuario_rol WHERE id = ${id}`
        );

        if (respuesta.rowCount > 0) return true;

        return 'No se encontró ningún registro para eliminar';
        
    } catch (error) {
        
        logger.error(`Error en deleteUsuarioRolById:  ${error}`);
        throw NewExcepcion('USUARIOROLCONSULTAEXCEPCION');
    }finally {
        
        consulta.end();
    }
}

export { 
    _insertUsuarioRol, 
    _getUsuarioRolById,
    _deleteUsuarioRolById,
    _getUsuarioRolByIdUsuario
};