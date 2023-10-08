import { Request } from "express";
import { ResponseModel } from "../models/model/response.model";
import { buildCotizacion, validarCamposCotizacion } from "../utils/validador.cotizacion";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { _getCotizacionByIdUsuario, _insertCotizacion, _updateCotizacion } from "../query/cotizacion.query";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";

const insertCotizacion = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCotizacion(req.body);

    const ganancia: CotizacionModel = buildCotizacion(req.body);

    return _insertCotizacion(ganancia);
};

const getCotizacionByIdUsuario = async ( req: Request ) => {

    const idUsuario:string = req.params.id;

    if(esFormatoValido(idUsuario)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getCotizacionByIdUsuario(idUsuario);
};

const updateCotizacion = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCotizacion(req.body);

    const cotizacion: CotizacionModel = buildCotizacion(req.body);

    return _updateCotizacion(cotizacion.id, cotizacion);
};

export { insertCotizacion, getCotizacionByIdUsuario, updateCotizacion };