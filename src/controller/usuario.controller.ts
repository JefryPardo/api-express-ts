// import { Request } from "express";
// import { getAllUser, insertUser, getUserById, getUserByDocumento } from "../query/copia.query";
// import { validarCamposUsuario, buildUsuario, validarNumero, validarAlfaNumerico } from "../../src/utils/validador";
// import { logger } from "../logs/logger";
// import { usuarioModel } from "../models/model/usuario.model";
// import { validarAlfanumericoModel } from "../models/utils/validar.alfanumerico.model";
// import { validarNumeroModel } from "../models/utils/validar.numero.model";


// const getAllUsuarios = async () => getAllUser();

// const getInsertUsuario = async ( req: Request ) => {

//     console.log('entra: ',req.body);

//     if(!req.body) {

//         logger.error(`Error en getInsertUsuario: campos de entrada no validos: ${req.body}`)
//         throw 'Se requiere un usuario valido.'
//     }

//     validarCamposUsuario(req.body);

//     const usuario: usuarioModel = buildUsuario(req.body);

//     insertUser(usuario);
// };

// const getUsuarioById = async ( req: Request ) => {

//     if(!req.params) {

//         return 'Se requiere id como parametro.'
//     }

//     const validarCampoUsuario: validarNumeroModel = validarNumero(req.params.id);

//     if(!validarCampoUsuario.valido || validarCampoUsuario.numero == null ) {

//         return 'Campo no valido, se requiere un id valido en los parametros';
//     }

//     return getUserById(validarCampoUsuario.numero);
// };

// const getUsuarioByDocumento = async ( req: Request ) => {

//     if(!req.params) {

//         return 'Se requiere documento como parametro.'
//     }


//     console.log(req.params.documento);

//     const respuesta: validarAlfanumericoModel = validarAlfaNumerico(req.params.documento);

//     if( !respuesta.valido || respuesta.alfanumerico == null ) {

//         return 'Campo no valido, se requiere un documento valido en los parametros';
//     }

//     return getUserByDocumento( respuesta.alfanumerico );
// };

// export { getAllUsuarios, getInsertUsuario, getUsuarioById, getUsuarioByDocumento };