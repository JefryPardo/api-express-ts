import "dotenv/config";
import { logger } from "./logs/logger";

import cors from 'cors';
import express from "express";
import config from 'config';
import { routerRol } from "./routes/rol.route";
import { routerAuth } from "./routes/auth/auth.route";
import { usuarioRouter } from "./routes/usuario.route";
import { routerProducto } from "./routes/productos.route";

const _origin:      string = config.get('config.origin');
const _methods:      string = config.get('config.methods');
const _ambiente:    string = config.get('ambiente');
const _puerto:      number = config.get('server.port');
const _contextPath: string = config.get('server.servlet.contextPath');

const app = express();
app.use(cors({
    origin: _origin,
    methods: _methods,
    credentials: true,
}));

app.use(express.json());
app.use(`${_contextPath}/rol`,      routerRol);
app.use(`${_contextPath}/usuario`,  usuarioRouter);
app.use(`${_contextPath}/auth`,     routerAuth);
app.use(`${_contextPath}/producto`, routerProducto);

app.listen(_puerto, () => logger.info(`Servidor listo, puerto: ${_puerto} - Ambiente: ${_ambiente}`) );