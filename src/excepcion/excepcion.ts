
import { Excepcion } from './class/query.excepcion';
import * as mensajesJSON from'./mensajes/mensaje.excepcion.json';

interface MensajesJSON {
  [key: string]: {
    code: string;
    log: string;
    mensaje: string;
  };
};

const mensajes: MensajesJSON = mensajesJSON;
type TipoError = keyof typeof mensajesJSON;
export function NewExcepcion(error: TipoError, comodinMensaje?: string): Excepcion {
    
  if(comodinMensaje) {

    const { code, log } = mensajes[error];
    return new Excepcion(code, log, comodinMensaje, new Date());
  }

  const { code, log, mensaje } = mensajes[error];
  return new Excepcion(code, log, mensaje, new Date());
};