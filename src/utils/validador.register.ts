import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { RegisterModel } from "../models/auth/register.model";
import { limpiarEspaciosExtremos, validarEmailFormato, validarSoloLetras, validarStringLetrasNumeros, validarStringNumerico } from "./validador";

const validarBodyRegister = ( registerBody: any ) => {

    for (let index in registerBody) {

        if(
            index != "nombre"           && 
            index != "apellido"         && 
            index != "direccion"        && 
            index != "celular"          && 
            index != "tipo_documento"   && 
            index != "documento"        && 
            index != "clave"            && 
            index != "usuario"
        ) {

            throw NewExcepcion('GENERICO',`Campo: '${index}' no valido.`);
        }
    }
}

const validarCamposRegister = ( campos: any ): RegisterModel => {

    const registro: RegisterModel = limpiarCamposRegister(campos);
    
    if(!validarEmailFormato(registro.usuario))          throw NewExcepcion('CAMPOUSUARIOEXCEPCION');
    if(validarSoloLetras(registro.nombre))              throw NewExcepcion('CAMPONOMBREEXCEPCION');
    if(validarSoloLetras(registro.apellido))            throw NewExcepcion('CAMPOAPELLIDOEXCEPCION');
    if(validarStringNumerico(registro.celular))         throw NewExcepcion('CAMPOCELULAREXCEPCION');
    if(validarStringNumerico(registro.tipo_documento))  throw NewExcepcion('CAMPOTIPODOCUMENTOEXCEPCION');
    if(validarStringLetrasNumeros(registro.documento))  throw NewExcepcion('CAMPODOCUMENTOEXCEPCION');
    
    return registro;
}

const limpiarCamposRegister = ( campos: any ) => {

    try {
        
        let registro = new RegisterModel();

        registro.nombre         = limpiarEspaciosExtremos(campos.nombre);
        registro.apellido       = limpiarEspaciosExtremos(campos.apellido);
        registro.direccion      = limpiarEspaciosExtremos(campos.direccion);
        registro.celular        = limpiarEspaciosExtremos(campos.celular);
        registro.tipo_documento = limpiarEspaciosExtremos(campos.tipo_documento);
        registro.documento      = limpiarEspaciosExtremos(campos.documento);
        registro.usuario        = limpiarEspaciosExtremos(campos.usuario);
        registro.clave          = campos.clave;
        
        return registro;

    } catch (error) {
        
        logger.error('Error en limpiarCamposRegister: '+ error);
        throw NewExcepcion('VALIDADOREXCEPCION','limpiarCamposRegister');
    }
}

export { validarBodyRegister, validarCamposRegister, limpiarCamposRegister };