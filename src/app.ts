import "dotenv/config";
// import { routerAuth } from './routes/auth.route';
import { logger } from "./logs/logger";

import cors from 'cors';
import express from "express";
import config from 'config';
import { routerRol } from "./routes/rol.route";

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
app.use(`${_contextPath}/rol`,  routerRol);

logger.info(`cors permitidos: ${_origin}`);
app.listen(_puerto, () => logger.info(`Servidor listo, puerto: ${_puerto} - Ambiente: ${_ambiente}`) );