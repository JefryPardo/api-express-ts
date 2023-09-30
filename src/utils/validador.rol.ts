import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { ResponseModel } from "../models/model/response.model";
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
        throw NewExcepcion('ROLEXCEPCION');
    }
}

const validarCamposRol = ( rol: any ) => {

    for (let index in rol) {

        if(
            index != "id"      && 
            index != "rol"      && 
            index != "estado"
        ) {

            return new ResponseModel('#IRF02',`Campo: ${index} no valido.`);
        }
    }
}

export {buildRol, validarCamposRol};