import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { ResponseModel } from "../models/model/response.model";

const buildCotizacion = ( data: any ): CotizacionModel => {

    try {
        
        let cotizacion = new CotizacionModel();

        cotizacion.id                   = data.id;   
        cotizacion.nombre_cliente       = data.id_categoria;
        cotizacion.cedula_cliente       = data.id_categoria;
        cotizacion.correo_cliente       = data.id_categoria;
        cotizacion.fecha_creacion       = data.id_categoria;
        cotizacion.fecha_vencimiento    = data.id_categoria;
        cotizacion.id_usuario           = data.id_categoria;

        return cotizacion;

    } catch (error) {
        
        logger.error(`Error en buildContizacion: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposCotizacion = ( cotizacionBody: any ) => {

    for (let index in cotizacionBody) {

        if(
            index != "id"                   && 
            index != "nombre_cliente"       &&
            index != "cedula_cliente"       &&
            index != "correo_cliente"       &&
            index != "fecha_creacion"       &&
            index != "fecha_vencimiento"    &&
            index != "id_usuario"           
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildCotizacion, validarCamposCotizacion};