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
exports.register = void 0;
const response_model_1 = require("../../models/model/response.model");
const usuario_model_1 = require("../../models/model/usuario.model");
const validador_1 = require("../../utils/validador");
const validador_register_1 = require("../../utils/validador.register");
const usuario_controller_1 = require("../usuario.controller");
const usuario_rol_query_1 = require("../../query/relaciones/usuario_rol.query");
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0)
        return new response_model_1.ResponseModel('#R01', 'Data ingresada no validad.');
    (0, validador_register_1.validarBodyRegister)(req.body);
    const registro = (0, validador_register_1.validarCamposRegister)(req.body);
    const disponibilidad = yield (0, usuario_controller_1.validarDisponibilidadUsuario)(registro.usuario.trim());
    if (disponibilidad)
        return new response_model_1.ResponseModel('#R02', 'Usuario no disponible.');
    const sugerencias = (0, validador_1.validarEstandaresPassword)(req.body);
    // if(sugerencias.length > 0) return new ResponseModel('#R03', sugerencias);
    const claveHash = yield (0, validador_1.encriptadoDeClave)(registro.clave);
    const usuario = new usuario_model_1.UsuarioModel();
    usuario.nombre = registro.nombre;
    usuario.apellido = registro.apellido;
    usuario.direccion = registro.direccion;
    usuario.celular = registro.celular;
    usuario.tipo_documento = registro.tipo_documento;
    usuario.documento = registro.documento;
    usuario.fecha_creacion = (0, validador_1.fechaActual)();
    usuario.intentos_fallidos = '0';
    usuario.clave = claveHash;
    usuario.usuario = registro.usuario;
    usuario.estado = 'activo';
    const response = yield (0, usuario_controller_1.insertUsuario)(usuario);
    yield (0, usuario_rol_query_1._insertUsuarioRol)(response.id, 'b19517e2-b383-4656-8099-67d49ca3a8c7');
    return new response_model_1.ResponseModel('#RS', 'Se registro correctamente.');
});
exports.register = register;
