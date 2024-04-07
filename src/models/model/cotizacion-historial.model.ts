import { CotizacionModel } from "./cotizacion.model";
import { ResumenProductoModel } from "./resumen-producto.model";

export class CotizacionHistorialModel {

    referencia          : string;
    version             : string;
    correo              : string;
    descripcion         : string;
    mano_de_obra        : number;
    detalle_de_obra     : string;
    producto_historial  : ResumenProductoModel[];
    cotizacion          : CotizacionModel;
}