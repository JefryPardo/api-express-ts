import { conexion } from "./conexion"
import { logger } from "./../logs/logger";
import { RolModel } from "../models/auth/rol.model";

const getAllRols = async ():Promise<RolModel[]> => {

    const consulta = await conexion();
    try {
        
        const respuesta = await consulta.query(
            `
                SELECT 
                    id, rol
                from rol
            `
        );

        const rolList :RolModel[] = respuesta.rows; 
        logger.info(`getAllRols: se encontraron ${rolList.length} roles`);

        return rolList;

    } catch (error) {

        logger.error(`Error en getAllRols:  ${error}`);
        throw `Error inesperado, por favor reportar al administrador. #R01`
    } finally {

        consulta.end();
    }
}

export { getAllRols };