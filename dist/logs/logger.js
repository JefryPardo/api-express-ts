"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const date_and_time_1 = __importDefault(require("date-and-time"));
const now = new Date();
const nombreFile = date_and_time_1.default.format(now, 'YYYY-MM-DD');
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.simple()),
    transports: [
        new winston_1.transports.File({
            maxsize: 5120000,
            maxFiles: 20,
            filename: `${__dirname}/${nombreFile.concat('.log')}`
        }),
        new winston_1.transports.Console({
            level: 'debug',
        })
    ]
});
exports.logger = logger;
