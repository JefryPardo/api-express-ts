import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { ResponseModel } from "../models/model/response.model";
import { TipoModel } from "../models/model/tipo.model";

const buildTipo = ( data: any ):TipoModel => {

    try {
        
        let tipo = new TipoModel();

        tipo.id               = data.id;   
        tipo.tipo             = data.tipo;

        logger.info(`Se genero el modelo de tipo: ${tipo.tipo} correctamente`);
        
        return tipo;
        
    } catch (error) {

        logger.error(`Error en buildTipo: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposTipo = ( tipoBuild: any ) => {

    for (let index in tipoBuild) {

        if(
            index != "id"      && 
            index != "tipo"
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildTipo, validarCamposTipo};