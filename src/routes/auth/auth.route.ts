import { Router, Request, Response } from "express";
import { succes, error } from "../../network/response";
import { auth } from "../../controller/auth/auth.controller";
import { register } from "../../controller/auth/register.controller";

const routerAuth = Router();

routerAuth.post("/login", (req: Request, res: Response) => {

    auth( req )
    .then(  _res    => succes(  req, res, _res))
    .catch( _error  => error(   req, res, _error));
});

routerAuth.post("/register", (req: Request, res: Response) => {

    register( req )
    .then(  _res    => succes(  req, res, _res))
    .catch( _error  => error(   req, res, _error));
});

export { routerAuth };