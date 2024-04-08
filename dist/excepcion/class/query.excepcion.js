"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excepcion = void 0;
class Excepcion extends Error {
    constructor(code, log, mensaje, hora) {
        super(`time: ${new Date()}: ${log}`);
        this.code = code;
        this.mensaje = mensaje;
        this.hora = hora;
        Object.setPrototypeOf(this, Excepcion.prototype);
    }
}
exports.Excepcion = Excepcion;
