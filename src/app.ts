import "dotenv/config";
import { logger } from "./logs/logger";

import cors from 'cors';
import express from "express";
import config from 'config';
import { routerRol } from "./routes/rol.route";
import { routerAuth } from "./routes/auth/auth.route";
import { usuarioRouter } from "./routes/usuario.route";

const _origin:      string = config.get('cors.origin');
const _ambiente:    string = config.get('ambiente');
const _puerto:      number = config.get('server.port');
const _contextPath: string = config.get('server.servlet.contextPath');

const app = express();
app.use(cors({
    origin: _origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(`${_contextPath}/rol`,      routerRol);
app.use(`${_contextPath}/usuario`,  usuarioRouter);
app.use(`${_contextPath}/auth`,     routerAuth);

logger.info(`cors permitidos: ${_origin}`);
app.listen(_puerto, () => logger.info(`Servidor listo, puerto: ${_puerto} - Ambiente: ${_ambiente}`) );