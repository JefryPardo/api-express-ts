import { NewExcepcion } from "../excepcion/excepcion";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { closeConnection, conexion } from "./conexion";

const _insertCotizacion = async (cotizacion: CotizacionModel) => {
    
    const consulta = await conexion();
    
    try {
    
        const query = `
            INSERT INTO cotizacion (
                nombre,
                fecha_creacion, 
                fecha_vencimiento, 
                nombre_cliente, 
                cedula_cliente, 
                correo_cliente, 
                id_usuario
            ) VALUES (
                '${cotizacion.nombre}',
                '${cotizacion.fecha_creacion}', 
                '${cotizacion.fecha_vencimiento}', 
                '${cotizacion.nombre_cliente}', 
                '${cotizacion.cedula_cliente}', 
                '${cotizacion.correo_cliente}', 
                '${cotizacion.id_usuario}'
            )
        `;

        const result = await consulta.query(query);

        if (result.rowCount === 1) {
            
            const usuarioResp: boolean = await _getCotizacionByNombreAndUsuario(cotizacion.nombre,cotizacion.id_usuario);
            
            if(!usuarioResp) throw 'valor no esperado.';
            
            return usuarioResp;
        }
        
        throw 'respuesta no esperada.';

    } catch (error) {
        console.log(error);        
        throw NewExcepcion('FATALERROR','_insertCotizacion',error);
    }finally {
        
        closeConnection(consulta);
    }
};

const _getCotizacionByIdUsuario = async (id_usuario: string):Promise<CotizacionModel[]> => {
    
    const consulta = await conexion();
    
    try {
        
        const query = `SELECT * FROM cotizacion WHERE id_usuario = '${id_usuario}'`;
        const result = await consulta.query(query);
        
        const cotizacion_list :CotizacionModel[] = result.rows; 
        return cotizacion_list;

    } catch (error) {

        throw 'Error inesperado al obtener cotizacion por ID.';
    } finally {
        closeConnection(consulta);
    }
};

const _getCotizacionById = async (id: string):Promise<CotizacionModel> => {
    
    const consulta = await conexion();
    
    try {
        
        const query = `SELECT * FROM cotizacion WHERE id = '${id}'`;
        const result = await consulta.query(query);
        
        if(result.rowCount !== 1) throw NewExcepcion('FINDCOTIZACIONEXCEPCION');

        const cotizacion :CotizacionModel = result.rows[0]; 

        return cotizacion;

    } catch (error) {

        throw NewExcepcion('FATALERROR','_getCotizacionById',error);
    } finally {
        closeConnection(consulta);
    }
};

const _getCotizacionByNombreAndUsuario = async (nombre: string, id_usuario:string):Promise<boolean> => {
    
    const consulta = await conexion();
    
    try {
        
        const query = `SELECT * FROM cotizacion WHERE nombre = '${nombre}' and id_usuario = '${id_usuario}'`;
        const result = await consulta.query(query);
        
        return result.rows[0]? true:false;

    } catch (error) {

        throw NewExcepcion('FATALERROR','_getCotizacionByNombreAndUsuario',error);
    } finally {
        closeConnection(consulta);
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

        throw 'Error inesperado al actualizar cotizacion.';
    } finally {
        closeConnection(consulta);
    }
};

export {
    _insertCotizacion,
    _getCotizacionByIdUsuario,
    _updateCotizacion,
    _getCotizacionByNombreAndUsuario,
    _getCotizacionById
};