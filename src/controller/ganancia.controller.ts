import { Request } from "express";
import { ResponseModel } from "../models/model/response.model";
import { buildGanancia, validarCamposGanancia } from "../utils/validador.ganancia";
import { GananciaModel } from "../models/model/ganancia.model";
import { _getGananciaByIdUsuario, _insertGanancia, _updateGananciaById } from "../query/ganancia.query";
import { esFormatoValido } from "../utils/validador";
import { NewExcepcion } from "../excepcion/excepcion";

const insertGanancia = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposGanancia(req.body);

    const ganancia: GananciaModel = buildGanancia(req.body);

    return _insertGanancia(ganancia);
};

const getGananciaByIdUsuario = async ( req: Request ) => {

    const idUsuario:string = req.params.id;

    if(esFormatoValido(idUsuario)) throw NewExcepcion('IDNOVALIDOEXCEPCION');

    return _getGananciaByIdUsuario(idUsuario);
};

const updateGananciaById = async ( req: Request ) => {

    const idGanancia:string                   = req.params.id;
    const porcentaje_ganancia:string          = req.params.procentaje;

    if(esFormatoValido(idGanancia)) throw NewExcepcion('IDNOVALIDOEXCEPCION');
    
    return _updateGananciaById(
        idGanancia,
        porcentaje_ganancia
    );
};

export { insertGanancia, getGananciaByIdUsuario, updateGananciaById };