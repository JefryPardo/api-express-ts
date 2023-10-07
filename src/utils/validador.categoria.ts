import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { CategoriaModel } from "../models/model/categoria.model";
import { ResponseModel } from "../models/model/response.model";

const buildCategoria = ( data: any ): CategoriaModel => {

    try {
        
        let categoria = new CategoriaModel();

        categoria.id        = data.id;   
        categoria.categoria = data.categoria;

        return categoria;

    } catch (error) {
        
        logger.error(`Error en buildCategoria: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposCategoria = ( cotizacionBody: any ) => {

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

export {buildCategoria, validarCamposCategoria};