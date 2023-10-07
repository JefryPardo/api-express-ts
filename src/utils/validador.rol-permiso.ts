import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { ResponseModel } from "../models/model/response.model";
import { RolPermisoModel } from "../models/model/rol-permiso.model";

const buildRolPermiso = ( data: any ): RolPermisoModel => {

    try {
        
        let rol_permiso = new RolPermisoModel();

        rol_permiso.id           = data.id;   
        rol_permiso.id_permiso   = data.id_permiso;
        rol_permiso.id_rol       = data.id_rol;

        return rol_permiso;

    } catch (error) {
        
        logger.error(`Error en buildRolPermiso: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposRolPermiso = ( rolPermisoBody: any ) => {

    for (let index in rolPermisoBody) {

        if(
            index != "id"                   && 
            index != "id_permiso"       &&
            index != "id_rol"           
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildRolPermiso, validarCamposRolPermiso};