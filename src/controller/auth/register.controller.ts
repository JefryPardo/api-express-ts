import { Request } from "express";
import { NewExcepcion } from "../../excepcion/excepcion";
import { RegisterModel } from "../../models/auth/register.model";
import { ResponseModel } from "../../models/model/response.model";
import { UsuarioModel } from "../../models/model/usuario.model";
import { encriptadoDeClave, fechaActual, validarEmailFormato, validarEstandaresPassword } from "../../utils/validador";
import { validarBodyRegister, validarCamposRegister } from "../../utils/validador.register";
import { insertUsuario, validarDisponibilidadUsuario } from "../usuario.controller";
import { _insertUsuarioRol } from "../../query/relaciones/usuario_rol.query";

const register = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarBodyRegister(req.body);
    if(!validarEmailFormato(req.body)) return new ResponseModel('#','Formato del correo no valido.');
    
    const disponibilidad = await validarDisponibilidadUsuario(req.body.usuario.trim());
    if (disponibilidad) return new ResponseModel('#', 'Usuario no disponible.');


    validarEstandaresPassword(req.body);

    const registro: RegisterModel =  validarCamposRegister(req.body);

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

    const response = await insertUsuario(usuario);

    if(!response) throw NewExcepcion('INSERTEXCEPCION');

    const estado:boolean = await _insertUsuarioRol(usuario.id,'b19517e2-b383-4656-8099-67d49ca3a8c7');

    if(!estado) throw NewExcepcion('INSERTEXCEPCION');

    return new ResponseModel('#', 'Se registro correctamente.');
};

export {register};