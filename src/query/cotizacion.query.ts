import { NewExcepcion } from "../excepcion/excepcion";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { ResponseModel } from "../models/model/response.model";
import { conexion } from "./conexion";

const _insertCotizacion = async (cotizacion: CotizacionModel) => {
    
    const consulta = await conexion();
    
    try {
    
        const query = `
            INSERT INTO cotizacion (
                fecha_creacion, 
                fecha_vencimiento, 
                nombre_cliente, 
                cedula_cliente, 
                correo_cliente, 
                id_usuario,
                nombre
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7
            )
        `;
        
        const values = [
            cotizacion.fecha_creacion,
            cotizacion.fecha_vencimiento,
            cotizacion.nombre_cliente,
            cotizacion.cedula_cliente,
            cotizacion.correo_cliente,
            cotizacion.id_usuario,
            cotizacion.nombre
        ];

        const result = await consulta.query(query, values);

        return result.rows;

    } catch (error) {
        
        console.error('Error en insertCotizacion:', error);
        throw 'Error inesperado al insertar cotizacion.';
    }finally {
        
        consulta.end();
    }
};

const _getCotizacionByIdUsuario = async (id_usuario: string):Promise<CotizacionModel[]> => {
    
    const consulta = await conexion();
    
    try {
        
        const query = 'SELECT * FROM cotizacion WHERE id_usuario = $1';
        const result = await consulta.query(query, [id_usuario]);
        
        if(result.rowCount !== 1) throw NewExcepcion('GENERICO');

        const cotizacion_list :CotizacionModel[] = result.rows; 

        return cotizacion_list;

    } catch (error) {

        console.error('Error en getCotizacionByIdUsuario:', error);
        throw 'Error inesperado al obtener cotizacion por ID.';
    } finally {
        
        consulta.end();
    }
};

const _getCotizacionById = async (id: string):Promise<CotizacionModel> => {
    
    const consulta = await conexion();
    
    try {
        
        const query = 'SELECT * FROM cotizacion WHERE id = $1';
        const result = await consulta.query(query, [id]);
        
        if(result.rowCount !== 1) throw NewExcepcion('GENERICO');

        const cotizacion :CotizacionModel = result.rows[0]; 

        return cotizacion;

    } catch (error) {

        console.error('Error en _getCotizacionById:', error);
        throw 'Error inesperado al obtener cotizacion por ID.';
    } finally {
        
        consulta.end();
    }
};

const _getCotizacionByNombreAndUsuario = async (nombre: string, id_usuario:string):Promise<boolean> => {
    
    const consulta = await conexion();
    
    try {
        
        const query = 'SELECT * FROM cotizacion WHERE nombre = $1 and id_usuario = $2';
        const result = await consulta.query(query, [nombre,id_usuario]);
        
        return result.rows[0]? true:false;

    } catch (error) {

        console.error('Error en _getCotizacionByNombre:', error);
        throw 'Error inesperado al obtener cotizacion por usuario.';
    } finally {
        
        consulta.end();
    }
};
  
const _updateCotizacion = async (id: string, cotizacion: CotizacionModel) => {
    
    const consulta = await conexion();
    
    try {
        const query = `
            UPDATE 
                cotizacion
            SET 
                fecha_creacion = $1, 
                fecha_vencimiento = $2, 
                nombre_cliente = $3, 
                cedula_cliente = $4,
                correo_cliente = $5, 
                id_usuario = $6,
                nombre = $7
            WHERE 
                id = $8
        `;
        
        const values = [
            cotizacion.fecha_creacion,
            cotizacion.fecha_vencimiento,
            cotizacion.nombre_cliente,
            cotizacion.cedula_cliente,
            cotizacion.correo_cliente,
            cotizacion.id_usuario,
            cotizacion.nombre,
            id,
        ];
        
        const result = await consulta.query(query, values);
        
        return result.rows;

    } catch (error) {

        console.error('Error en updateCotizacion:', error);
        throw 'Error inesperado al actualizar cotizacion.';
    } finally {
        
        consulta.end();
    }
};

export {
    _insertCotizacion,
    _getCotizacionByIdUsuario,
    _updateCotizacion,
    _getCotizacionByNombreAndUsuario,
    _getCotizacionById
};