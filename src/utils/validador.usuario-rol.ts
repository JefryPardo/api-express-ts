import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { ResponseModel } from "../models/model/response.model";
import { UsuarioRolModel } from "../models/model/usuario-rol.model";

const buildUsuarioRol = ( data: any ): UsuarioRolModel => {

    try {
        
        let usuario_rol = new UsuarioRolModel();

        usuario_rol.id          = data.id;   
        usuario_rol.id_rol      = data.id_rol;
        usuario_rol.id_usuario  = data.id_usuario;

        return usuario_rol;

    } catch (error) {
        
        logger.error(`Error en buildUsuarioRol: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposUsuarioRol = ( usuarioRolBody: any ) => {

    for (let index in usuarioRolBody) {

        if(
            index != "id"           && 
            index != "id_rol"       &&
            index != "id_usuario"           
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildUsuarioRol, validarCamposUsuarioRol};