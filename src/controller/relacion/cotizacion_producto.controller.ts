import { Request } from "express";
import { validarToken } from "../jwt.controlle";
import { ResponseModel } from "../../models/model/response.model";
import { buildCotizacionProducto, validarCamposCotizacionProducto } from "../../utils/validador.cotizacion-producto";
import { CotizacionProductoModel } from "../../models/model/cotizacion-producto.model";
import { NewExcepcion } from "../../excepcion/excepcion";
import { esFormatoValido } from "../../utils/validador";
import { _getProductoById } from "../../query/producto.query";
import { ProductoModel } from "../../models/model/producto.model";
import { CotizacionModel } from "../../models/model/cotizacion.model";
import { _getCotizacionById } from "../../query/cotizacion.query";
import { _insertCotizacionProducto } from "../../query/relaciones/cotizacion_producto";

const insertCotizacionProducto = async ( req: Request ) => {

    await validarToken(req);

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCotizacionProducto(req.body);

    const cotizacion_producto: CotizacionProductoModel = buildCotizacionProducto(req.body);

    if(esFormatoValido(cotizacion_producto.id_cotizacion)) throw NewExcepcion('IDNOVALIDOEXCEPCION');
    if(esFormatoValido(cotizacion_producto.id_producto)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    const producto:ProductoModel = await _getProductoById(cotizacion_producto.id_producto);
    if(!producto)  throw NewExcepcion('GENERICO');
    
    const cotizacion:CotizacionModel = await _getCotizacionById(cotizacion_producto.id_cotizacion);
    if(!cotizacion)  throw NewExcepcion('GENERICO');

    return _insertCotizacionProducto(
        cotizacion_producto.id_cotizacion,
        cotizacion_producto.id_producto
    );
};


const deleteCotizacion = async ( req: Request ) => {

    await validarToken(req);

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposCotizacion(req.body);

    const cotizacion: CotizacionModel = buildCotizacion(req.body);

    return _updateCotizacion(cotizacion.id, cotizacion);
};