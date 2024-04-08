"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarToken = exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const excepcion_1 = require("../excepcion/excepcion");
const getToken = (id, roles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretKey = process.env.SECRET;
        if (!secretKey)
            throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'getToken');
        const token = jsonwebtoken_1.default.sign({
            sub: id,
            roles: roles,
            exp: Date.now() + 60 * 60 * 1000
        }, secretKey);
        return token;
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('FATALERROR', 'login:getToken', error);
    }
});
exports.getToken = getToken;
const validarToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers)
            throw (0, excepcion_1.NewExcepcion)('TOKENEXCEPCION');
        const secretKey = process.env.SECRET;
        if (!secretKey)
            throw (0, excepcion_1.NewExcepcion)('SECRETEXCEPCION');
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader == undefined || bearerHeader == undefined)
            throw (0, excepcion_1.NewExcepcion)('TOKENEXCEPCION');
        const token = bearerHeader.split(" ")[1];
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        if (Date.now() > payload.exp)
            throw (0, excepcion_1.NewExcepcion)('TOKENEXPIRADOEXCEPCION');
    }
    catch (error) {
        throw (0, excepcion_1.NewExcepcion)('TOKENEXCEPCION', 'validarToken', error);
    }
});
exports.validarToken = validarToken;
