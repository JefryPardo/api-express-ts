export class Excepcion extends Error {

  code: string;
  log: string;
  mensaje: string;
  hora: string

  constructor(code: string, log:string, mensaje:string, hora:string) {
    super(`time: ${new Date()}: ${log}`);
    this.code           = code;
    this.mensaje        = mensaje;
    this.hora           = hora;
    Object.setPrototypeOf(this, Excepcion.prototype);
  }
}