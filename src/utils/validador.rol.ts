import { logger } from "../logs/logger";
import { RolModel } from "../models/model/rol.model";

const buildRol = ( data: any ):RolModel => {

    try {
        
        let rol = new RolModel();

        rol.id               = data.id;   
        rol.rol              = data.rol;
        rol.estado           = data.estado;

        logger.info(`Se genero el modelo de rol: ${rol.rol} correctamente`);
        return rol;
    } catch (error) {

        logger.error(`Error en buildRol: ${error}`);
        throw `Error inesperado, por favor comunicar con el administrador. #VR01`;
    }
}

const validarCamposRol = ( rol: any ) => {

    for (let index in rol) {

        if(
            index != "rol"      && 
            index != "estado"
        ) {

            logger.error(`Error en validarCamposRol: el siguiente campo no esta permitido ${index}`);
            throw `El siguiente campo no esta permitido: ${index}`;
        }
    }
}

export {buildRol, validarCamposRol};