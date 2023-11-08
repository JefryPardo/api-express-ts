import { Request } from "express";
import { validarToken } from "../jwt.controlle";
import { ResponseModel } from "../../models/model/response.model";
import { buildCotizacionProducto, buildCotizacionProductoUpdate, validarCamposCotizacionProducto, validarCamposCotizacionProductoUpdate } from "../../utils/validador.cotizacion-producto";
import { CotizacionProductoModel } from "../../models/model/cotizacion-producto.model";
import { NewExcepcion } from "../../excepcion/excepcion";
import { _getProductoById } from "../../query/producto.query";
import { ProductoModel } from "../../models/model/producto.model";
import { CotizacionModel } from "../../models/model/cotizacion.model";
import { _getCotizacionById } from "../../query/cotizacion.query";
import { _deleteCotizacionProductoByIds, _getCotizacionProductoByIdCotizacion, _getCotizacionProductoByidCotizacionAndIdProducto, _insertCotizacionProducto, _updateCotizacionProducto } from "../../query/relaciones/cotizacion_producto";
import { CotizacionProductoUpdateModel } from "../../models/model/cotizacion.producto.update.model";

const insertCotizacionProducto = async ( req: Request ) => {

    await validarToken(req);

    if(Object.keys(req.body).length === 0) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposCotizacionProducto(req.body);

    const cotizacion_producto: CotizacionProductoModel = buildCotizacionProducto(req.body);

    const producto:ProductoModel = await _getProductoById(cotizacion_producto.id_producto);
    if(!producto)  throw NewExcepcion('GENERICO');
    
    const cotizacion:CotizacionModel = await _getCotizacionById(cotizacion_producto.id_cotizacion);
    if(!cotizacion)  throw NewExcepcion('GENERICO');
    
    const invalid:boolean = await _getCotizacionProductoByidCotizacionAndIdProducto(
        cotizacion_producto.id_producto,
        cotizacion_producto.id_cotizacion
    );
        
    if(invalid)  throw NewExcepcion('GENERICO');

    const estado_insert:boolean = await _insertCotizacionProducto(
        cotizacion_producto.cantidad,
        cotizacion_producto.id_cotizacion,
        cotizacion_producto.id_producto
    );

    return new ResponseModel(
        '#ICPS', 
        estado_insert
    );
};


const deleteCotizacionProductoById = async ( req: Request ) => {

    await validarToken(req);

    if(!req.params.idcotizacion || !req.params.idproducto) throw NewExcepcion('GENERICO');
    
    const id_cotizacion :string = req.params.idcotizacion;
    const id_producto   :string = req.params.idproducto;

    const response:boolean = await _deleteCotizacionProductoByIds(
        id_cotizacion,
        id_producto
    );

    if(!response) throw NewExcepcion('FATALERROR', 'deleteCotizacionProductoById', 'No se pudo borrar correctamente.');

    return new ResponseModel(
        '#DCPS', 
        response
    );
};

const updateCotizacionProducto = async ( req: Request ) => {

    const id_cotizacion_producto:string = req.params.id;
    await validarToken(req);

    if(Object.keys(req.body).length === 0) return new ResponseModel('#','Data ingresada no validad.');

    validarCamposCotizacionProductoUpdate(req.body);
    const cotizacion_producto_update: CotizacionProductoUpdateModel = buildCotizacionProductoUpdate(req.body);

    const estado: boolean = await _updateCotizacionProducto(id_cotizacion_producto,cotizacion_producto_update.id);

    return new ResponseModel(
        '#UCPS', 
        estado
    );
};

const getCotizacionProductoAll = async ( req: Request ) => {

    const id_cotizacion:string = req.params.id;
    await validarToken(req);

    const cotizacion_producto: CotizacionProductoModel[] = await _getCotizacionProductoByIdCotizacion(id_cotizacion);

    return new ResponseModel(
        '#GCPS', 
        cotizacion_producto
    );
};

export {
    insertCotizacionProducto,
    updateCotizacionProducto,
    deleteCotizacionProductoById,
    getCotizacionProductoAll
}