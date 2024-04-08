"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.conexion = void 0;
const pg_1 = require("pg");
const excepcion_1 = require("../excepcion/excepcion");
const conexion = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = new pg_1.Pool({
        connectionString: 'postgres://uaanq59dnolmqi:p5c91b3e820e78381c6a842c61a70c93e2637c1a3c3aeb4943afe15c7a042b2c9@c9pbiquf6p6pfn.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/dcp0tj1o1832v8',
        ssl: {
            rejectUnauthorized: false // Esto permite conexiones a servidores con certificados autofirmados.
        }
    });
    try {
        const client = yield pool.connect();
        console.log('Conexión exitosa a la base de datos.');
        return client; // Retorna el cliente para usar en otras consultas.
    }
    catch (error) {
        console.error(error);
        throw (0, excepcion_1.NewExcepcion)('CONEXIONEXCEPCION');
    }
});
exports.conexion = conexion;
const closeConnection = (client) => {
    if (client) {
        client.release();
        console.log('Conexión cerrada.');
    }
};
exports.closeConnection = closeConnection;
