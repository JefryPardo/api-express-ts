import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { AuthModel } from "../models/auth/login.model";
import { ResponseModel } from "../models/model/response.model";

const buildAuth = ( data: any ): AuthModel => {

    try {
        
        let auth = new AuthModel();

        auth.usuario        = data.usuario;   
        auth.clave          = data.clave;

        return auth;

    } catch (error) {
        
        logger.error(`Error en buildAuth: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposAuth = ( authBody: any ) => {

    for (let index in authBody) {

        if(
            index != "usuario"                   && 
            index != "clave"           
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildAuth, validarCamposAuth};