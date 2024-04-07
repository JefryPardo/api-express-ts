import { Request } from "express";
import { RegisterModel } from "../../models/auth/register.model";
import { ResponseModel } from "../../models/model/response.model";
import { UsuarioModel } from "../../models/model/usuario.model";
import { encriptadoDeClave, fechaActual, validarEstandaresPassword } from "../../utils/validador";
import { validarBodyRegister, validarCamposRegister } from "../../utils/validador.register";
import { insertUsuario, validarDisponibilidadUsuario } from "../usuario.controller";
import { _insertUsuarioRol } from "../../query/relaciones/usuario_rol.query";

const register = async ( req: Request ) => {

    if(Object.keys(req.body).length === 0) return new ResponseModel('#R01','Data ingresada no validad.');

    validarBodyRegister(req.body);
    const registro: RegisterModel =  validarCamposRegister(req.body);

    const disponibilidad = await validarDisponibilidadUsuario(registro.usuario.trim());
    if (disponibilidad) return new ResponseModel('#R02', 'Usuario no disponible.');

    const sugerencias:string[] = validarEstandaresPassword(req.body);

    // if(sugerencias.length > 0) return new ResponseModel('#R03', sugerencias);

    const claveHash:string = await encriptadoDeClave(registro.clave);

    const usuario = new UsuarioModel();

    usuario.nombre              = registro.nombre;
    usuario.apellido            = registro.apellido;
    usuario.direccion           = registro.direccion;
    usuario.celular             = registro.celular;
    usuario.tipo_documento      = registro.tipo_documento;
    usuario.documento           = registro.documento;
    usuario.fecha_creacion      = fechaActual();
    usuario.intentos_fallidos   = '0';
    usuario.clave               = claveHash;
    usuario.usuario             = registro.usuario;
    usuario.estado              = 'activo';

    const response:UsuarioModel = await insertUsuario(usuario);

    await _insertUsuarioRol(response.id,'b19517e2-b383-4656-8099-67d49ca3a8c7');

    return new ResponseModel('#RS', 'Se registro correctamente.');
};

export {register};