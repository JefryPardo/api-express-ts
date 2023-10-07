import { UsuarioModel } from "../models/model/usuario.model";
import { logger } from "../logs/logger";
import { ResponseModel } from "../models/model/response.model";

const buildUsuario = ( data: any ):UsuarioModel => {

    try {
        
        let usuario = new UsuarioModel();

        usuario.id                  = data.id;   
        usuario.nombre              = data.nombre;
        usuario.apellido            = data.apellido;
        usuario.direccion           = data.direccion;
        usuario.celular             = data.celular;
        usuario.tipo_documento      = data.tipo_documento;
        usuario.documento           = data.documento;
        usuario.token               = data.token;
        usuario.secret              = data.secret;
        usuario.fecha_creacion      = data.fecha_creacion;
        usuario.intentos_fallidos   = data.intentos_fallidos;
        usuario.clave               = data.clave;
        usuario.login               = data.login;
        usuario.activo              = data.activo;

        logger.info(`Se genero el modelo de usuario: ${usuario.id} correctamente`);
        
        return usuario;

    } catch (error) {

        logger.error(`Error en buildUsuario: ${error}`);
        throw `Error inesperado, por favor comucnicar con el administrador. #V01`;
    }
}

const validarCamposUsuario = ( usuario: any ) => {

    for (let index in usuario) {

        if(
            index != "id"                   &&
            index != "nombre"               &&
            index != "apellido"             && 
            index != "direccion"            &&
            index != "celular"              &&
            index != "tipo_documento"       &&
            index != "documento"            &&
            index != "token"                &&
            index != "secret"               &&
            index != "fecha_creacion"       &&
            index != "intentos_fallidos"    &&
            index != "clave"                &&
            index != "login"                &&
            index != "activo"
        ) {

            logger.error(`Error en validarCamposUsuario: el siguiente campo no esta permitido ${index}`);
            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export { buildUsuario, validarCamposUsuario };