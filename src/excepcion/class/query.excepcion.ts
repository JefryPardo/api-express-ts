export class QueryExcepcion extends Error {

  code: string;
  recommendation: string;
  name: string;

  constructor(code: string, message:string, recommendation:string) {
    super(message);
    this.code = code;
    this.recommendation = recommendation;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, QueryExcepcion.prototype);
  }
}