import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { CotizacionProductoModel } from "../models/model/cotizacion-producto.model";
import { ResponseModel } from "../models/model/response.model";

const buildCotizacionProducto = ( data: any ): CotizacionProductoModel => {

    try {
        
        let cotizacion_producto = new CotizacionProductoModel();

        cotizacion_producto.id              = data.id;   
        cotizacion_producto.id_cotizacion   = data.id_cotizacion;
        cotizacion_producto.id_producto     = data.id_producto;

        return cotizacion_producto;

    } catch (error) {
        
        logger.error(`Error en buildCategoria: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposCotizacionProducto = ( cotizacionProductoBody: any ) => {

    for (let index in cotizacionProductoBody) {

        if(
            index != "id"                   && 
            index != "id_cotizacion"        &&
            index != "id_producto"            
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildCotizacionProducto, validarCamposCotizacionProducto};