
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

export { validarSplitDeNumeros, validarNumero, validarAlfaNumerico };