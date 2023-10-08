import { Request } from "express";
import { AuthModel } from "../../models/auth/login.model";
import { ResponseModel } from "../../models/model/response.model";
import { validarEmailFormato } from "../../utils/validador";
import { buildAuth, validarCamposAuth } from "../../utils/validador.auth";
import { getUsuarioByUsuario } from "../usuario.controller";

const secretKey = process.env.SECRET;

const auth = async ( req: Request ) => {

    if(!req.body) {

        return new ResponseModel('#','Data ingresada no validad.');
    }

    validarCamposAuth(req.body);
    if(!validarEmailFormato(req.body)) return new ResponseModel('#','Formato del correo no valido.');

    const auth: AuthModel   = buildAuth(req.body);
    const usuario           = await getUsuarioByUsuario(auth.usuario);

    if(!usuario) return new ResponseModel('#', 'Usuario o Credenciales no validas.');

    

    return new ResponseModel('#', usuario);
};

export { auth };