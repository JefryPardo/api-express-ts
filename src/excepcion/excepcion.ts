
import { logger } from '../logs/logger';
import { Excepcion } from './class/query.excepcion';
import * as mensajesJSON from'./mensajes/mensaje.excepcion.json';
import date from 'date-and-time';
interface MensajesJSON {
  [key: string]: {
    code: string;
    log: string;
    mensaje: string;
  };
};

const mensajes: MensajesJSON = mensajesJSON;
type TipoError = keyof typeof mensajesJSON;
export function NewExcepcion(error: TipoError, metodo?: string, error_critico?:unknown): Excepcion {
    
  const now   = new Date();
  const time  = date.format(now,'YYYY-MM-DD HH:mm:ss');
  const { code, log, mensaje } = mensajes[error];

  if(error_critico) {

    logger.error(` time: ${time} metodo: ${metodo} | ${error_critico}`);
    return new Excepcion(code, log, mensaje, time);
  }

  if(metodo) {

    logger.error(` time: ${time} metodo: ${metodo} | ${log}`);
    return new Excepcion(code, log, mensaje, time);
  }
  
  logger.error(` time: ${time} | ${log}`);
  return new Excepcion(code, log, mensaje, time);
};