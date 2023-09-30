export class Excepcion extends Error {

  code: string;
  message: string;
  recommendation: string;
  hora: Date

  constructor(code: string, message:string, recommendation:string, hora:Date) {
    super(message);
    this.code           = code;
    this.recommendation = recommendation;
    this.hora           = hora;
    Object.setPrototypeOf(this, Excepcion.prototype);
  }
}