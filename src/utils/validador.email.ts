import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { CotizacionHistorialModel } from "../models/model/cotizacion-historial.model";

const buildDataEmail = ( data: any ): CotizacionHistorialModel => {

    try {
        
        let emailData = new CotizacionHistorialModel();

        emailData.correo                = data.correo;
        emailData.cotizacion            = data.cotizacion;
        emailData.descripcion           = data.descripcion;
        emailData.detalle_de_obra       = data.detalle_de_obra;
        emailData.mano_de_obra          = data.mano_de_obra;
        emailData.producto_historial    = data.producto_historial;
        emailData.referencia            = data.referencia;
        emailData.version               = data.version;

        return emailData;

    } catch (error) {
        
        logger.error(`Error en buildContizacion: ${error}`);
        throw NewExcepcion('EMAILEXCEPCION');
    }
}

export {buildDataEmail};