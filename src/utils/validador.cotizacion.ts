import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { CotizacionModel } from "../models/model/cotizacion.model";
import { ResponseModel } from "../models/model/response.model";

const buildCotizacion = ( data: any ): CotizacionModel => {

    try {
        
        let cotizacion = new CotizacionModel();

        cotizacion.nombre               = data.nombre;
        cotizacion.nombre_cliente       = data.nombre_cliente;
        cotizacion.cedula_cliente       = data.cedula_cliente;
        cotizacion.correo_cliente       = data.correo_cliente;
        cotizacion.fecha_vencimiento    = data.fecha_vencimiento;
        cotizacion.id_usuario           = data.id_usuario;

        return cotizacion;

    } catch (error) {
        
        logger.error(`Error en buildContizacion: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposCotizacion = ( cotizacionBody: any ) => {

    for (let index in cotizacionBody) {

        if(
            index != "nombre"               &&
            index != "nombre_cliente"       &&
            index != "cedula_cliente"       &&
            index != "correo_cliente"       &&
            index != "fecha_vencimiento"    &&
            index != "id_usuario"           
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildCotizacion, validarCamposCotizacion};