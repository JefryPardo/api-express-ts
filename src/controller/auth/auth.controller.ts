import { Request } from "express";
import { AuthModel } from "../../models/auth/login.model";
import { ResponseModel } from "../../models/model/response.model";
import { validarEmailFormato, validarPassword } from "../../utils/validador";
import { buildAuth, validarCamposAuth } from "../../utils/validador.auth";
import { getUsuarioByUsuario } from "../usuario.controller";
import { getToken } from "../jwt.controlle";
import { _getUsuarioRolByIdUsuario } from "../../query/relaciones/usuario_rol.query";
import { _getRolById } from "../../query/rol.query";
import { LoginResponseModel } from "../../models/auth/response/login-response.model";
import { UsuarioRolModel } from "../../models/model/usuario-rol.model";

const auth = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposAuth(req.body);
    if(!validarEmailFormato(req.body)) return new ResponseModel('#','Formato del correo no valido.');

    const auth: AuthModel   = buildAuth(req.body);
    const usuario           = await getUsuarioByUsuario(auth.usuario);
    if(!usuario) return getResponse();
    
    const resp = await validarPassword(auth.clave,usuario.clave);
    
    if(!resp) return getResponse();
    
    const usuario_rol:UsuarioRolModel[] = await _getUsuarioRolByIdUsuario(usuario.id);
    if(usuario_rol.length < 1) return getResponse();
    
    const id_rol: string[] = usuario_rol.map(_rol => _rol.id_rol);
    if(id_rol.length < 1) return getResponse();

    const rols = await Promise.all(id_rol.map(id => _getRolById(id)));

    if(rols.length < 1) return getResponse();
    
    const rolesActivos: string[] = rols.filter(rol => rol.estado === 'activo').map(rol => rol.rol);
    if(rolesActivos.length < 1) return getResponse();
    
    const token = await getToken(usuario.id);
    
    const loginResponse:LoginResponseModel =  {
        'token': token,
        'permisos': rolesActivos
    };

    return new ResponseModel(
        '#', 
        loginResponse
    );
};

const getResponse = () => {

    return new ResponseModel('#', 'Usuario o Credenciales no validas.');
}

export { auth };