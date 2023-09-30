
import { Excepcion } from './class/query.excepcion';
import * as mensajesJSON from'./mensajes/mensaje.excepcion.json';

interface MensajesJSON {
  [key: string]: {
    code: string;
    message: string;
    recommendation: string;
  };
};

const mensajes: MensajesJSON = mensajesJSON;
type TipoError = keyof typeof mensajesJSON;
export function NewExcepcion(error: TipoError): Excepcion {
    
  const { code, message, recommendation } = mensajes[error];
  return new Excepcion(code, message, recommendation, new Date());
};