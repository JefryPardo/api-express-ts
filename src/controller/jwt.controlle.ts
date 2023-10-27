import jwt, { Secret } from 'jsonwebtoken';
import { NewExcepcion } from '../excepcion/excepcion';
import { logger } from '../logs/logger';
import { Request } from "express";


const getToken = async (id: string, roles: string[]): Promise<string> => {
    
    try {
        
        const secretKey: Secret | undefined = process.env.SECRET;

        if (!secretKey) throw NewExcepcion('FATALERROR','getToken');

        const token = jwt.sign(
            {
                sub: id,
                roles:roles,
                exp: Date.now() + 60 * 60 * 1000
            },
            secretKey
        );

        return token;

    } catch (error) {
        
        throw NewExcepcion('FATALERROR','login:getToken',error);
    }
};

const validarToken = async (req: Request): Promise<void> => {
    try {

        if(!req.headers) throw NewExcepcion('TOKENEXCEPCION');

        const secretKey: Secret | undefined = process.env.SECRET;
        if (!secretKey) throw NewExcepcion('SECRETEXCEPCION');

        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader == undefined || bearerHeader == undefined)  throw NewExcepcion('TOKENEXCEPCION');

        const token = bearerHeader.split(" ")[1];
        const payload:any = jwt.verify(token, secretKey);

        if (Date.now() > payload.exp) throw NewExcepcion('TOKENEXPIRADOEXCEPCION');
        
    } catch (error) {

        throw NewExcepcion('TOKENEXCEPCION','validarToken',error);
    }
};

export { getToken, validarToken }