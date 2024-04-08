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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarpdf = exports.transporter = void 0;
const nodemailer = require('nodemailer');
const fs = require('fs');
const pdf = require('html-pdf');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'cotizacion.generada@gmail.com',
        pass: 'fwhz xzuy noqk mfjm',
    },
});
exports.transporter = transporter;
const generarpdf = (html, callback) => __awaiter(void 0, void 0, void 0, function* () {
    pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, buffer);
    });
});
exports.generarpdf = generarpdf;
