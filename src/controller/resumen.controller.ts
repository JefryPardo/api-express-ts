import { Request } from "express";
import { validarToken } from "./jwt.controlle";
import { NewExcepcion } from "../excepcion/excepcion";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { _getCotizacionById } from "../query/cotizacion.query";
import { _getCotizacionProductoByIdCotizacion } from "../query/relaciones/cotizacion_producto";
import { CotizacionProductoModel } from "../models/model/cotizacion-producto.model";
import { _getProductoById } from "../query/producto.query";
import { ResumenProductoModel } from "../models/model/resumen-producto.model";
import { ResumenModel } from "../models/model/resumen.model";
import { ResponseModel } from "../models/model/response.model";

const getResumen = async ( req: Request ) => {

    const id_cotizacion:string = req.params.id;

    await validarToken(req);

    const cotizacion: CotizacionModel = await _getCotizacionById(id_cotizacion);

    if(cotizacion.id  == undefined || cotizacion.id  == null) throw NewExcepcion('FATALERROR','getResumen','valor no esperado al consultar cotizacion.');;

    const cotizacion_producto: CotizacionProductoModel[] = await _getCotizacionProductoByIdCotizacion(cotizacion.id);

    let resumen_producto_list: ResumenProductoModel[] = [];

    for (const data of cotizacion_producto) {
        
        const resumen_producto = new ResumenProductoModel();

        const id_producto = data.id_producto;
        const producto = await _getProductoById(id_producto);
        
        resumen_producto.cantidad   = data.cantidad;
        resumen_producto.producto  = producto;

        resumen_producto_list.push(resumen_producto);
    }

    let resumen = new ResumenModel();

    resumen.cotizacion          = cotizacion;
    resumen.resumen_producto    = resumen_producto_list;

    return new ResponseModel(
        '#SR', 
        resumen
    );
};

export { 
    getResumen
};