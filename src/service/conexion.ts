import pg from "pg";
import config from 'config';
import { logger } from "../logs/logger";


const _host:                    string  = config.get('credenciales.host');
const _user:                    string  = config.get('credenciales.user');
const _password:                string  = config.get('credenciales.password');
const _database:                string  = config.get('credenciales.database');
const _port:                    number  = config.get('credenciales.port');
// const _sslRejectUnauthorized:   boolean = config.get('credenciales.ssl.rejectUnauthorized');

const conexion = async () => {

    // const client = new pg.Client({
    
    //     host    : _host,
    //     user    : _user,
    //     password: _password,
    //     database: _database,
    //     port    : _port,
    //     ssl     : {
    //         rejectUnauthorized: _sslRejectUnauthorized
    //     }
    // });
    const client = new pg.Client({
    
        host    : _host,
        user    : _user,
        password: _password,
        database: _database,
        port    : _port,
        ssl     : false
    });
    
    await client.connect()
                .then(_res => succes())
                .catch(_error =>  error(_error));
    
    return client;
};

const succes = () => {

    logger.info(`Se hace la conexión con exito.`);
}

const error = ( res: void) => {

    logger.error(`Error en conexion: ${res}`);
    throw `Error inesperado, por favor reportarlo con el administrador. #C01`
}

export { conexion };