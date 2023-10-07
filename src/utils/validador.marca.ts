import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { MarcaModel } from "../models/model/marca.model";
import { ResponseModel } from "../models/model/response.model";

const buildMarca = ( data: any ):MarcaModel => {

    try {
        
        let marca = new MarcaModel();

        marca.id    = data.id;   
        marca.marca = data.marca;

        logger.info(`Se genero el modelo marca: ${marca.marca} correctamente`);
        
        return marca;

    } catch (error) {
        
        logger.error(`Error en buildMarca: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposMarca = ( marcaBody: any ) => {

    for (let index in marcaBody) {

        if(
            index != "id"      && 
            index != "marca"
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildMarca, validarCamposMarca};