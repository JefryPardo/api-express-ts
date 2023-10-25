import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { LoginModel } from "../models/auth/login.model";

const buildLogin = ( data: any ): LoginModel => {

    try {
        
        let auth = new LoginModel();

        auth.usuario        = data.usuario;   
        auth.clave          = data.clave;

        return auth;

    } catch (error) {
        
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposLogin = ( authBody: any ) => {

    for (let index in authBody) {

        if(
            index != "usuario"                   && 
            index != "clave"           
        ) {

            throw NewExcepcion('GENERICO',`Campo: '${index}' no valido.`);
        }
    }
}

export {
    buildLogin, 
    validarCamposLogin
};