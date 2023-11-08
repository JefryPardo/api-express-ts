import { CotizacionModel } from "./cotizacion.model";
import { ResumenProductoModel } from "./resumen-producto.model";

export class ResumenModel {
    
    cotizacion: CotizacionModel;
    resumen_producto: ResumenProductoModel[]
}