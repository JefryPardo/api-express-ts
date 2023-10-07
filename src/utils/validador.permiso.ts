import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { PermisoModel } from "../models/model/permiso.model";
import { ResponseModel } from "../models/model/response.model";

const buildPermiso = ( data: any ):PermisoModel => {

    try {
        
        let permiso = new PermisoModel();

        permiso.id               = data.id;   
        permiso.permiso          = data.permiso;
        permiso.estado           = data.estado;

        logger.info(`Se genero el modelo de permiso: ${permiso.permiso} correctamente`);
        return permiso;
    } catch (error) {

        logger.error(`Error en buildPermiso: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposPermiso = ( permiso: any ) => {

    for (let index in permiso) {

        if(
            index != "id"      && 
            index != "permiso"      && 
            index != "estado"
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildPermiso, validarCamposPermiso};