import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { ProductoModel } from "../models/model/producto.model";
import { ResponseModel } from "../models/model/response.model";

const buildProducto = ( data: any ):ProductoModel => {

    try {
        
        let producto = new ProductoModel();

        producto.id                = data.id;   
        producto.nombre            = data.permiso;
        producto.precio            = data.estado;
        producto.referencia        = data.estado;
        producto.referencia_local  = data.estado;
        producto.unidades          = data.estado;
        producto.url_imagen        = data.estado;
        producto.descripcion       = data.estado;
        producto.ficha_tecnica     = data.estado;
        producto.id_categoria      = data.estado;
        producto.id_marca          = data.estado;
        producto.id_tipo           = data.estado;

        return producto;
    } catch (error) {

        logger.error(`Error en buildProducto: ${error}`);
        throw NewExcepcion('BUILDEXCEPCION');
    }
}

const validarCamposProducto = ( productoBody: any ) => {

    for (let index in productoBody) {

        if(
            index != "id"               && 
            index != "nombre"           && 
            index != "precio"           && 
            index != "referencia"       && 
            index != "referencia_local" && 
            index != "unidades"         && 
            index != "url_imagen"       &&
            index != "descripcion"      &&
            index != "ficha_tecnica"    &&
            index != "estado"           &&
            index != "id_categoria"     &&
            index != "id_marca"         &&
            index != "id_tipo"
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildProducto, validarCamposProducto};