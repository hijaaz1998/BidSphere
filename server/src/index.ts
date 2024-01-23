import cors from 'cors';
import http from 'http';
import connectDB from './frameworks/databse/connection';
import express, {Application, Express, Request, Response} from 'express';
import serverConfig from './frameworks/webServer/server';
import routes from './frameworks/webServer/routes';
import expressConfig from './frameworks/webServer/express';

const app: Application = express();
const server = http.createServer(app);

connectDB();
app.use(express.json());
app.use(cors());

expressConfig(app);

routes(app);



serverConfig(server).startServer();
