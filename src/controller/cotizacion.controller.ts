import { Request } from "express";
import { ResponseModel } from "../models/model/response.model";
import { buildCotizacion, buildCotizacionUpdate, validarCamposCotizacion } from "../utils/validador.cotizacion";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { _deleteCotizacion, _getCotizacionById, _getCotizacionByIdUsuario, _getCotizacionByNombreAndUsuario, _insertCotizacion, _updateCotizacion, _updateCotizacionUpdate } from "../query/cotizacion.query";
import { NewExcepcion } from "../excepcion/excepcion";
import { validarToken } from "./jwt.controlle";
import { _getUsuarioById, _getUsuarioByUsuario } from "../query/usuario.query";

const insertCotizacion = async ( req: Request ) => {

    await validarToken(req);

    if(Object.keys(req.body).length === 0) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposCotizacion(req.body);

    let cotizacion: CotizacionModel = buildCotizacion(req.body);

    cotizacion.fecha_creacion = obtenerFechaConFormato();

    const usuario = await _getUsuarioById(cotizacion.id_usuario);

    if(!usuario || usuario.estado == 'inactivo')  throw NewExcepcion('GENERICO');

    const invalido = await getCotizacionByNombreAndUsuario(
        cotizacion.nombre,
        usuario.id
    );

    if(invalido) throw NewExcepcion('NOMBRECOTIZACIONEXCEPCION');

    const response = await _insertCotizacion(cotizacion);

    if(!response) throw NewExcepcion('GENERICO');

    return new ResponseModel('#CS', 'Se inserto correctamente.');
};

const getCotizacionesByIdUsuario = async ( req: Request ) => {

    await validarToken(req);

    if(!req.params.id) throw NewExcepcion('GENERICO');

    const id_usuario:string = req.params.id;

    let response = await _getUsuarioById(id_usuario);
    if(response == null) throw NewExcepcion('GENERICO');

    const cotizaciones: CotizacionModel[] = await _getCotizacionByIdUsuario(id_usuario);

    return new ResponseModel(
        '#SC', 
        cotizaciones
    );
};

const updateCotizacion = async ( req: Request ) => {

    await validarToken(req);

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCotizacion(req.body);

    const cotizacion: CotizacionModel = buildCotizacionUpdate(req.body);

    if(cotizacion.id == null)  {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    return _updateCotizacionUpdate(cotizacion.id, cotizacion);
};

const deleteCotizacion = async ( req: Request ) => {

    await validarToken(req);

    if(!req.params.idcotizacion) throw NewExcepcion('GENERICO');
    
    const id_cotizacion :string = req.params.idcotizacion;

    const response:boolean = await _deleteCotizacion(
        id_cotizacion
    );

    if(!response) throw NewExcepcion('FATALERROR', 'deleteCotizacion', 'No se pudo borrar correctamente.');

    return new ResponseModel(
        '#DCPS', 
        response
    );
};


const obtenerFechaConFormato = () => {
    
    const fechaActual = new Date();
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaActual.getFullYear();
  
    return `${dia}/${mes}/${año}`;
}


const getCotizacionByNombreAndUsuario = async ( nombre: string, id_usuario:string ) => {

    return _getCotizacionByNombreAndUsuario(nombre,id_usuario);
};

const getCotizacionesById = async ( req: Request ) => {

    await validarToken(req);

    if(!req.params.id) throw NewExcepcion('GENERICO');

    const id:string = req.params.id;

    const cotizaciones: CotizacionModel = await _getCotizacionById(id);

    return new ResponseModel(
        '#GCS', 
        cotizaciones
    );
};


export { 
    insertCotizacion, 
    getCotizacionesByIdUsuario, 
    updateCotizacion,
    getCotizacionByNombreAndUsuario,
    getCotizacionesById,
    deleteCotizacion
};