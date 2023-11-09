import { NewExcepcion } from "../excepcion/excepcion";
import { logger } from "../logs/logger";
import { ProductoModel } from "../models/model/producto.model";
import { ResponseModel } from "../models/model/response.model";

const buildProducto = ( data: any ):ProductoModel => {

    try {
        
        let producto = new ProductoModel();

        producto.id                = data.id;   
        producto.nombre            = data.nombre;
        producto.descripcion       = data.descripcion;
        producto.url_imagen        = data.url_imagen;
        producto.referencia        = data.referencia;
        producto.referencia_local  = data.referencia_local;
        producto.precio            = data.precio;
        producto.ficha_tecnica     = data.ficha_tecnica;
        producto.unidades          = data.unidades;
        producto.estado            = data.estado;
        producto.categoria         = data.categoria;
        producto.tipo              = data.tipo;
        producto.marca             = data.marca;

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
            index != "categoria"     &&
            index != "marca"         &&
            index != "tipo"
        ) {

            return new ResponseModel('#',`Campo: ${index} no valido.`);
        }
    }
}

export {buildProducto, validarCamposProducto};