import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from "cors";

import { connectMessageServer } from './shared/services/messagin.service';

import serverConfigurationRoute from './serverConfiguration/routes/serverConfiguration.route';
import { initializeSocket } from './event/services/socket.service';

export class Server {
    public app: express.Application;
    public port: number | string = 3000;
    public server: any;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', this.port);
        this.app.use(cors());
        this.app.use(express.json());
        
        this.server = http.createServer(this.app);
        const io = new SocketIOServer(this.server, {cors: {origin: '*',}});
        initializeSocket(io);
        connectMessageServer();
    }

    public routes(): void {
        express.Router();
        this.app.get('/', (req, res)=>{
            res.send({ message: 'Server Running' });
        });
        this.app.use('/server', serverConfigurationRoute);
    }

    async startServer() {
        try {
            this.server.listen(this.app.get('port'), () => {
                console.log('server running on port: ', this.app.get('port'));
            });
        } catch (err) {
            console.log('Error on start server:', err);
            process.exit(1);
        }
    }

    async stopServer() {
        this.server.close(() => {
            console.log('server stopped');
        });
    }
}

const server = new Server();
server.startServer();