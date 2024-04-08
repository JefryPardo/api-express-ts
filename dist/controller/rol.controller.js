"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEstadoRolById = exports.getAllRol = exports.insertRol = void 0;
const rol_query_1 = require("../query/rol.query");
const validador_rol_1 = require("../utils/validador.rol");
const response_model_1 = require("../models/model/response.model");
const jwt_controlle_1 = require("./jwt.controlle");
const insertRol = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jwt_controlle_1.validarToken)(req);
    if (!req.body)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_rol_1.validarCamposRol)(req.body);
    const rol = (0, validador_rol_1.buildRol)(req.body);
    return (0, rol_query_1._insertRol)(rol);
});
exports.insertRol = insertRol;
const getAllRol = () => __awaiter(void 0, void 0, void 0, function* () { return (0, rol_query_1._getAllRols)(); });
exports.getAllRol = getAllRol;
// const getRolById = async ( req: Request ) => {
//     const idRol:string = req.params.id;
//     if(esFormatoValido(idRol)) throw NewExcepcion('IDNOVALIDOEXCEPCION');
//     return _getRolByIds(idRol);
// };
const updateEstadoRolById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return new response_model_1.ResponseModel('#', 'Data ingresada no validad.');
    (0, validador_rol_1.validarCamposRol)(req.body);
    if (!req.body.estado || req.body.id)
        return new response_model_1.ResponseModel('#', 'Campos ingresados NO son validos');
    return (0, rol_query_1._updateEstadoRolById)(req.body.id, req.body.estado);
});
exports.updateEstadoRolById = updateEstadoRolById;
