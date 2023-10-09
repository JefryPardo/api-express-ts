import jwt, { Secret } from 'jsonwebtoken';
import { NewExcepcion } from '../excepcion/excepcion';
import { logger } from '../logs/logger';
import { Request } from "express";
import { ResponseModel } from '../models/model/response.model';


const getToken = async (id: string): Promise<string> => {
    
    const secretKey: Secret | undefined = process.env.SECRET;

    if (!secretKey) throw NewExcepcion('SECRETEXCEPCION');

    const token = jwt.sign(
        {
            sub: id,
            exp: Date.now() + 60 * 1000
        },
        secretKey
    );

    return token;
};

const validarToken = async (req: Request): Promise<void> => {
    try {

        const secretKey: Secret | undefined = process.env.SECRET;
        if (!secretKey) throw NewExcepcion('SECRETEXCEPCION');

        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader == undefined || bearerHeader == undefined)  throw 'authorization no presente';

        const token = bearerHeader.split(" ")[1];
        console.log(token);

        const payload:any = jwt.verify(token, secretKey);

        console.log(payload);

        if (Date.now() > payload.exp) throw NewExcepcion('SECRETEXCEPCION')
        
    } catch (error) {

        // logger.error('Error al validar token: ',error);
        throw NewExcepcion('TOKENEXCEPCION');
    }
};

export { getToken, validarToken }