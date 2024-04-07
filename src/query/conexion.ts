import { Client, Pool } from "pg";
import { NewExcepcion } from "../excepcion/excepcion";


const conexion = async () => {
    
    const pool = new Pool({
        connectionString: 'postgres://uaanq59dnolmqi:p5c91b3e820e78381c6a842c61a70c93e2637c1a3c3aeb4943afe15c7a042b2c9@c9pbiquf6p6pfn.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/dcp0tj1o1832v8',
        ssl: {
          rejectUnauthorized: false // Esto permite conexiones a servidores con certificados autofirmados.
        }
    });
    
    try {
        const client = await pool.connect();
        console.log('Conexión exitosa a la base de datos.');
        return client; // Retorna el cliente para usar en otras consultas.
    } catch (error) {
        console.error(error);
        throw NewExcepcion('CONEXIONEXCEPCION');
    }
};

const closeConnection = (client:any) => {
    if (client) {
        client.release();
        console.log('Conexión cerrada.');
    }
};

export { conexion, closeConnection };