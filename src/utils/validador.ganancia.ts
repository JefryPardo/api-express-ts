import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { GananciaModel } from "../models/model/ganancia.model";
import { ResponseModel } from "../models/model/response.model";

const buildGanancia = ( data: any ): GananciaModel => {

    try {
        
        let ganancia = new GananciaModel();

        ganancia.id             = data.id;   
        ganancia.id_categoria   = data.id_categoria;
        ganancia.id_usuario     = data.id_usuario;

        return ganancia;

    } catch (error) {
        
        logger.error(`Error en buildGanancia: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposGanancia = ( marcaBody: any ) => {

    for (let index in marcaBody) {

        if(
            index != "id"           && 
            index != "id_categoria" &&
            index != "id_usuario"
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildGanancia, validarCamposGanancia};