
import { ResponseModel } from "../models/model/response.model";
import { validarAlfanumericoModel } from "../models/utils/validar.alfanumerico.model";
import { validarNumeroModel } from "../models/utils/validar.numero.model";
import validator  from 'validator';
import bcrypt  from 'bcrypt';
import zxcvbn  from 'zxcvbn';
import moment  from 'moment';
import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
/**
 * 
 * @param cadena 
 * @returns (false) sí todos los elementos del array son numero.
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
 * @returns (true) sí el string de entrada es un numero
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
 * @returns (true) sí es alfanumerico
 */
const validarAlfaNumerico = ( cadena: string ): validarAlfanumericoModel  => {
    
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


/**
 * 
 * @param cadena 
 * @returns (true) sí el campo ingresado tiene un formato valido
 */
const esFormatoValido = (campo:string) :boolean  => {
    const uuidRegex = /^[0-9a-fA-F]{32}$/;
    return !uuidRegex.test(campo);
}

const validarEmailFormato = (body: any) :boolean  => {

    return validator.isEmail(body.usuario);
}

const validarSoloLetras = ( texto:string ) :boolean  => {

    return !validator.isAlpha(texto);
}

const limpiarEspaciosExtremos = ( texto:string ) :string  => {

    return texto.trim();
}

const validarStringNumerico = ( texto:string ) :boolean  => {

    return !validator.isNumeric(texto);
}

const validarStringLetrasNumeros = ( texto:string ) :boolean  => {

    return !validator.isAlphanumeric(texto);
}

const validarEstandaresPassword = ( body: any )  => {

    const resultado = zxcvbn(body.clave);

    let sugerencias:string[] = [];

    if (resultado.score < 3) {
     
        sugerencias = resultado.feedback.suggestions;
    }
    
    return sugerencias;
}

const encriptadoDeClave = async (password: string): Promise<string> => {
    
    const saltRounds = 10;
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {

            reject(new Error('ENCRIPTADOEXCEPCION'));
        } else {

          resolve(hash);
        }
      });
    });
};

const validarPassword = async (password: string, clave:string): Promise<boolean> => {
  
    return new Promise<boolean>((resolve, reject) => {

        bcrypt.compare(password, clave, (err, result) => {
            
            if (err) {
              
                throw NewExcepcion('FATALERROR','validarPassword',err);
            }
            
            resolve(result);
        });

    });
};

const fechaActual = () :string  => {

    return moment().format('YYYY-MM-DD HH:mm'); 
}

export { 
    validarSplitDeNumeros, 
    validarNumero, 
    validarAlfaNumerico, 
    esFormatoValido, 
    validarEmailFormato, 
    validarSoloLetras, 
    limpiarEspaciosExtremos, 
    validarEstandaresPassword,
    validarStringNumerico,
    validarStringLetrasNumeros,
    encriptadoDeClave,
    fechaActual,
    validarPassword
};