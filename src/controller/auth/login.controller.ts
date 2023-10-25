import { Request } from "express";
import { ResponseModel } from "../../models/model/response.model";
import { validarEmailFormato, validarPassword } from "../../utils/validador";
import { getUsuarioByUsuario } from "../usuario.controller";
import { getToken } from "../jwt.controlle";
import { _getUsuarioRolByIdUsuario } from "../../query/relaciones/usuario_rol.query";
import { _getRolById } from "../../query/rol.query";
import { UsuarioRolModel } from "../../models/model/usuario-rol.model";
import { LoginModel } from "../../models/auth/login.model";
import { LoginResponseModel } from "../../models/auth/login.response.model";
import { buildLogin, validarCamposLogin } from "../../utils/validador.login";
import { NewExcepcion } from "../../excepcion/excepcion";

const login = async ( req: Request ) => {

    if(Object.keys(req.body).length === 0) return new ResponseModel('#L01','Data ingresada no validad.');

    validarCamposLogin(req.body);
    if(!validarEmailFormato(req.body)) return new ResponseModel('#L02','Formato del correo no valido.');

    const login: LoginModel     = buildLogin(req.body);
    const usuario               = await getUsuarioByUsuario(login.usuario);
    
    if(usuario == null)  throw NewExcepcion('CREDENCIALESXCEPCION');

    const resp = await validarPassword(
        login.clave,
        usuario.clave
    );
    
    if(!resp) throw NewExcepcion('CREDENCIALESXCEPCION');
    
    const usuario_rol:UsuarioRolModel[] = await _getUsuarioRolByIdUsuario(usuario.id);
    if(usuario_rol.length < 1) throw NewExcepcion('FATALERROR', 'login:usuario_rol');
    
    const id_rol: string[] = usuario_rol.map(_rol => _rol.id_rol);
    if(id_rol.length < 1) throw NewExcepcion('FATALERROR','login:id_rol');

    const rols = await Promise.all(id_rol.map(id => _getRolById(id)));

    if(rols.length < 1) throw NewExcepcion('FATALERROR','login:rols');
    
    const rolesActivos: string[] = rols.filter(rol => rol.estado === 'activo').map(rol => rol.rol);
    if(rolesActivos.length < 1) throw NewExcepcion('FATALERROR','login:rolesActivos');
    
    const token = await getToken(usuario.id);
    
    const response: LoginResponseModel = {
        "token": token,
        "roles": rolesActivos
    }

    return new ResponseModel(
        '#SL', 
        response
    );
};

export { login };