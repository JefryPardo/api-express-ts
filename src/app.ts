// import "dotenv/config";
import { logger } from "./logs/logger";

import cors from 'cors';
import express from "express";
// import config from 'config';
import { routerRol } from "./routes/rol.route";
import { routerAuth } from "./routes/auth/auth.route";
import { usuarioRouter } from "./routes/usuario.route";
import { routerProducto } from "./routes/productos.route";
import { routerMail } from "./routes/mail/mail.route";
import { routerCotizacion } from "./routes/cotizacion.route";
import { routerCotizacionProducto } from "./routes/relaciones/cotizacion_producto.route";
import { routerResumen } from "./routes/resumen.route";

const _origin:      string = 'http://localhost:4200';
const _methods:     string = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const _ambiente:    string = 'local';
const _puerto:      any    = process.env.PORT || 8083;
const _contextPath: string = "/app";

const app = express();
app.use(cors({
    origin: _origin,
    methods: _methods,
    credentials: true,
}));

app.use(express.json());
app.use(`${_contextPath}/rol`,                  routerRol);
app.use(`${_contextPath}/usuario`,              usuarioRouter);
app.use(`${_contextPath}/auth`,                 routerAuth);
app.use(`${_contextPath}/producto`,             routerProducto);
app.use(`${_contextPath}/mail`,                 routerMail);
app.use(`${_contextPath}/cotizacion`,           routerCotizacion);
app.use(`${_contextPath}/resumen`,              routerResumen);
app.use(`${_contextPath}/cotizacion-producto`,  routerCotizacionProducto);

app.listen(_puerto, () => logger.info(`Servidor listo, puerto: ${_puerto} - Ambiente: ${_ambiente}`) );