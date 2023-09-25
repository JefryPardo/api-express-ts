import { Request, Response } from "express";

const succes = ( req: Request, res: Response, payload: any ) => {
    
    let _payload: any   = payload || '';
    let statusCode: number = 200;
    
    res.status(200).send({
        status  : statusCode,
        body    : _payload
    });    
}

const error = ( req: Request, res: Response, payload: any ) => {
    
    let _payload: any   = payload || '';
    let statusCode: number = 500;
    
    res.status(200).send({
        status  : statusCode,
        body    : _payload
    });    
}

export { succes, error };