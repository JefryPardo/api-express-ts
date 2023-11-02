import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { CotizacionProductoModel } from "../models/model/cotizacion-producto.model";
import { CotizacionProductoUpdateModel } from "../models/model/cotizacion.producto.update.model";
import { ResponseModel } from "../models/model/response.model";

const buildCotizacionProducto = ( data: any ): CotizacionProductoModel => {

    try {
        
        let cotizacion_producto = new CotizacionProductoModel();

        cotizacion_producto.cantidad        = data.cantidad;
        cotizacion_producto.id_cotizacion   = data.id_cotizacion;
        cotizacion_producto.id_producto     = data.id_producto;

        return cotizacion_producto;

    } catch (error) {
        
        logger.error(`Error en buildCategoria: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const buildCotizacionProductoUpdate = ( data: any ): CotizacionProductoUpdateModel => {

    try {
        
        let cotizacion_producto_update = new CotizacionProductoUpdateModel();

        cotizacion_producto_update.cantidad        = data.cantidad;
        cotizacion_producto_update.id              = data.id;

        return cotizacion_producto_update;

    } catch (error) {
        
        logger.error(`Error en buildCategoria: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposCotizacionProducto = ( cotizacionProductoBody: any ) => {

    for (let index in cotizacionProductoBody) {

        if(
            index != "cantidad"        &&
            index != "id_cotizacion"        &&
            index != "id_producto"            
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

const validarCamposCotizacionProductoUpdate = ( cotizacionProductoBody: any ) => {

    for (let index in cotizacionProductoBody) {

        if(
            index != "cantidad"        &&
            index != "id"            
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildCotizacionProducto, validarCamposCotizacionProducto,validarCamposCotizacionProductoUpdate, buildCotizacionProductoUpdate};