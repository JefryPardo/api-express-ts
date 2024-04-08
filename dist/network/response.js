"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.succes = void 0;
const succes = (req, res, payload) => {
    let _payload = payload || '';
    let statusCode = 200;
    res.status(200).send({
        status: statusCode,
        body: _payload
    });
};
exports.succes = succes;
const error = (req, res, payload) => {
    let _payload = payload || '';
    let statusCode = 500;
    res.status(200).send({
        status: statusCode,
        body: _payload
    });
};
exports.error = error;
