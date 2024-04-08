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
exports.login = void 0;
const response_model_1 = require("../../models/model/response.model");
const validador_1 = require("../../utils/validador");
const usuario_controller_1 = require("../usuario.controller");
const jwt_controlle_1 = require("../jwt.controlle");
const usuario_rol_query_1 = require("../../query/relaciones/usuario_rol.query");
const rol_query_1 = require("../../query/rol.query");
const validador_login_1 = require("../../utils/validador.login");
const excepcion_1 = require("../../excepcion/excepcion");
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0)
        return new response_model_1.ResponseModel('#L01', 'Data ingresada no validad.');
    (0, validador_login_1.validarCamposLogin)(req.body);
    if (!(0, validador_1.validarEmailFormato)(req.body))
        return new response_model_1.ResponseModel('#L02', 'Formato del correo no valido.');
    const login = (0, validador_login_1.buildLogin)(req.body);
    const usuario = yield (0, usuario_controller_1.getUsuarioByUsuario)(login.usuario);
    if (usuario == null)
        throw (0, excepcion_1.NewExcepcion)('CREDENCIALESXCEPCION');
    const resp = yield (0, validador_1.validarPassword)(login.clave, usuario.clave);
    if (!resp)
        throw (0, excepcion_1.NewExcepcion)('CREDENCIALESXCEPCION');
    const usuario_rol = yield (0, usuario_rol_query_1._getUsuarioRolByIdUsuario)(usuario.id);
    if (usuario_rol.length < 1)
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'login:usuario_rol');
    const id_rol = usuario_rol.map(_rol => _rol.id_rol);
    if (id_rol.length < 1)
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'login:id_rol');
    const rols = yield Promise.all(id_rol.map(id => (0, rol_query_1._getRolById)(id)));
    if (rols.length < 1)
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'login:rols');
    const rolesActivos = rols.filter(rol => rol.estado === 'activo').map(rol => rol.rol);
    if (rolesActivos.length < 1)
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'login:rolesActivos');
    const token = yield (0, jwt_controlle_1.getToken)(usuario.id, rolesActivos);
    // const response: LoginResponseModel = {
    //     "token": token,
    //     "roles": rolesActivos
    // }
    return new response_model_1.ResponseModel('#SL', token);
});
exports.login = login;
