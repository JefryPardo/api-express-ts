"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewExcepcion = void 0;
const logger_1 = require("../logs/logger");
const query_excepcion_1 = require("./class/query.excepcion");
const mensajesJSON = __importStar(require("./mensajes/mensaje.excepcion.json"));
const date_and_time_1 = __importDefault(require("date-and-time"));
;
const mensajes = mensajesJSON;
function NewExcepcion(error, metodo, error_critico) {
    const now = new Date();
    const time = date_and_time_1.default.format(now, 'YYYY-MM-DD HH:mm:ss');
    const { code, log, mensaje } = mensajes[error];
    if (error_critico) {
        logger_1.logger.error(` time: ${time} metodo: ${metodo} | ${error_critico}`);
        return new query_excepcion_1.Excepcion(code, log, mensaje, time);
    }
    if (metodo) {
        logger_1.logger.error(` time: ${time} metodo: ${metodo} | ${log}`);
        return new query_excepcion_1.Excepcion(code, log, mensaje, time);
    }
    logger_1.logger.error(` time: ${time} | ${log}`);
    return new query_excepcion_1.Excepcion(code, log, mensaje, time);
}
exports.NewExcepcion = NewExcepcion;
;
