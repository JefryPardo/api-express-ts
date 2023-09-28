
import { QueryExcepcion } from './class/query.excepcion';
import * as mensajesJSON from'./mensajes/mensaje.excepcion.json';

interface MensajesJSON {
    [key: string]: {
      code: string;
      message: string;
      recommendation: string;
    };
}

const mensajes: MensajesJSON = mensajesJSON;
export function NewQueryExcepcion(error: string): QueryExcepcion {
    
    const { code, message, recommendation } = mensajes[error];
    return new QueryExcepcion(code, message, recommendation);
}