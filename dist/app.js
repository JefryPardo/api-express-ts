"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import "dotenv/config";
const logger_1 = require("./logs/logger");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import config from 'config';
const rol_route_1 = require("./routes/rol.route");
const auth_route_1 = require("./routes/auth/auth.route");
const usuario_route_1 = require("./routes/usuario.route");
const productos_route_1 = require("./routes/productos.route");
const mail_route_1 = require("./routes/mail/mail.route");
const cotizacion_route_1 = require("./routes/cotizacion.route");
const cotizacion_producto_route_1 = require("./routes/relaciones/cotizacion_producto.route");
const resumen_route_1 = require("./routes/resumen.route");
const _origin = 'http://localhost:4200';
const _methods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const _ambiente = 'local';
const _puerto = process.env.PORT || 8083;
const _contextPath = "/app";
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: _origin,
    methods: _methods,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(`${_contextPath}/rol`, rol_route_1.routerRol);
app.use(`${_contextPath}/usuario`, usuario_route_1.usuarioRouter);
app.use(`${_contextPath}/auth`, auth_route_1.routerAuth);
app.use(`${_contextPath}/producto`, productos_route_1.routerProducto);
app.use(`${_contextPath}/mail`, mail_route_1.routerMail);
app.use(`${_contextPath}/cotizacion`, cotizacion_route_1.routerCotizacion);
app.use(`${_contextPath}/resumen`, resumen_route_1.routerResumen);
app.use(`${_contextPath}/cotizacion-producto`, cotizacion_producto_route_1.routerCotizacionProducto);
app.listen(_puerto, () => logger_1.logger.info(`Servidor listo, puerto: ${_puerto} - Ambiente: ${_ambiente}`));
