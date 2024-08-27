import pg from "pg";
import { NewExcepcion } from "../excepcion/excepcion";

const _host:      string  = 'localhost';
const _user:      string  = 'postgres';
const _password:  string  = 'postgres';
const _database:  string  = 'cristaleria';
const _port:      number  = 5432;

const conexion = async () => {
        
    const client = new pg.Client({
    
        host    : _host,
        user    : _user,
        password: _password,
        database: _database,
        port    : _port,
        ssl     : false
    });

    await client.connect()
    .then((_res:any) => succes())
    .catch((_error:any) =>  error(_error));
    
    return client;
};

const succes = () => {}

const error = ( res: void) => {
    throw NewExcepcion('CONEXIONEXCEPCION');
}

export { conexion };