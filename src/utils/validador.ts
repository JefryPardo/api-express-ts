
import { logger } from "../logs/logger";
import { usuarioModel } from "../models/usuario.model";
import { validarAlfanumericoModel } from "../models/utils/validar.alfanumerico.model";
import { validarNumeroModel } from "../models/utils/validar.numero.model";

/**
 * 
 * @param cadena 
 * @returns false sí todos los elementos del array son numero.
 */
const validarSplitDeNumeros = ( cadena: string ) => {

    const idsArray: string[] = cadena.split(',');

    for (let index: number = 0; index < idsArray.length; index++) {

        if(!Number.isInteger(idsArray[index])) {

            return true;
        }
    }
    
    return false;
}

/**
 * 
 * @param numero 
 * @returns true sí el string de entrada es un numero
 */
const validarNumero = ( numero: any ): validarNumeroModel  => {
    
    const estado = Number.isInteger(Number(numero));

    const respuesta = {

        valido: estado,
        numero: (estado)? Number(numero): null
    }

    return respuesta;
}

/**
 * 
 * @param cadena 
 * @returns true sí es alfanumerico
 */
const validarAlfaNumerico = ( cadena: string ): validarAlfanumericoModel  => {
    
    console.log(cadena);

    const regxp = "/([a-zA-Z0-9])/";
    
    const regexp = new RegExp(regxp);
    const res = regexp.test(cadena);
    console.log(res);

    let estado = false;

    const respuesta = {

        valido: estado,
        alfanumerico: (estado)? cadena: null
    }

    return respuesta;
}

const buildUsuario = ( data: any ):usuarioModel => {

    try {
        
        let usuario = new usuarioModel();

        usuario.id                          = data.id;   
        usuario.nombre                      = data.nombre;
        usuario.apellido                    = data.apellido;
        usuario.tipo_documento              = data.tipo_documento;
        usuario.documento_identificacion    = data.documento_identificacion;
        usuario.estado                      = data.estado;
        usuario.sexo                        = data.sexo;

        logger.info(`Se genero el modelo de usuario: ${usuario.documento_identificacion} correctamente`);
        return usuario;
    } catch (error) {

        logger.error(`Error en buildUsuario: ${error}`);
        throw `Error inesperado, por favor comucnicar con el administrador. #V01`;
    }
}

const validarCamposUsuario = ( usuario: any ) => {

    for (let index in usuario) {

        if(
            index != "nombre"                   && 
            index != "apellido"                 && 
            index != "tipo_documento"           && 
            index != "documento_identificacion" && 
            index != "estado"                   &&
            index != "sexo"
        ) {

            logger.error(`Error en validarCamposUsuario: el siguiente campo no esta permitido ${index}`);
            throw `El siguiente campo no esta permitido: ${index}`;
        }
    }
}

export { validarSplitDeNumeros, validarNumero, validarCamposUsuario, buildUsuario, validarAlfaNumerico };