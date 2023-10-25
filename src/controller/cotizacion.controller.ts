import { Request } from "express";
import { ResponseModel } from "../models/model/response.model";
import { buildCotizacion, validarCamposCotizacion } from "../utils/validador.cotizacion";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { _getCotizacionByIdUsuario, _getCotizacionByNombreAndUsuario, _insertCotizacion, _updateCotizacion } from "../query/cotizacion.query";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";
import { validarToken } from "./jwt.controlle";
import { _getUsuarioById } from "../query/usuario.query";

const insertCotizacion = async ( req: Request ) => {

    await validarToken(req);

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCotizacion(req.body);

    const cotizacion: CotizacionModel = buildCotizacion(req.body);

    if(esFormatoValido(cotizacion.id_usuario)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    const usuario = await _getUsuarioById(cotizacion.id_usuario);

    if(!usuario || usuario.estado == 'inactivo')  throw NewExcepcion('GENERICO');

    const invalido = await getCotizacionByNombreAndUsuario(
        usuario.id,
        cotizacion.nombre
    );

    if(invalido) throw NewExcepcion('GENERICO');

    return _insertCotizacion(cotizacion);
};

const getCotizacionesByIdUsuario = async ( req: Request ) => {

    await validarToken(req);

    if(!req.params.id) throw NewExcepcion('GENERICO');

    const id_usuario:string = req.params.id;

    if(esFormatoValido(id_usuario)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getCotizacionByIdUsuario(id_usuario);
};

const updateCotizacion = async ( req: Request ) => {

    await validarToken(req);

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCotizacion(req.body);

    const cotizacion: CotizacionModel = buildCotizacion(req.body);

    return _updateCotizacion(cotizacion.id, cotizacion);
};





const getCotizacionByNombreAndUsuario = async ( nombre: string, id_usuario:string ) => {

    return _getCotizacionByNombreAndUsuario(nombre,id_usuario);
};




export { 
    insertCotizacion, 
    getCotizacionesByIdUsuario, 
    updateCotizacion,
    getCotizacionByNombreAndUsuario
};