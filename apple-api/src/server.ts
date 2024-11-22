import express from 'express';
import * as dotenv from "dotenv";

import exampleRoute from './example/routes/example.route';
import { connectMessageServer, sendMessage } from './shared/services/messagin.service';

export class Server {
    public app: express.Application
    public port = 5103;
    public server: any;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        dotenv.config();
        this.app.set('port', process.env.PORT || this.port);
        this.initCors();
        this.app.use(express.json());

        connectMessageServer();
    }

    private initCors() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, taskId');
            if (req.method === 'OPTIONS') {
                return res.sendStatus(200);
            } else {
                return next();
            }
        });
    }

    public routes(): void {
        express.Router();
        this.app.get('/', (req, res)=>{
            res.send({message: 'Server Running'});
        });
        this.app.use('/example/', exampleRoute);
    }

    async startServer() {
        try {
            this.server = this.app.listen(this.app.get('port'), () => {
                console.log('server [AppleExample] running on port : ', this.app.get('port'));
            });
            this.sendAndroidPrices();
        } catch (err) {
            console.log('Error on start server:', err);
            process.exit(1)
        }
    }

    async stopServer() {
        this.server.close(() => {
            console.log('server stopped');
        });
    }

    async sendAndroidPrices() {
        const androidPrices = [
            { model: "Samsung Galaxy S24 Ultra", price: 1299990 },
            { model: "Xiaomi 14T 5G", price: 499990 },
            { model: "Samsung Galaxy A55 5G", price: 399990 },
            { model: "Motorola Moto G24 Power", price: 119990 },
            { model: "Xiaomi Redmi Note 13 Pro 4G", price: 209990 }
        ];

        setInterval(()=> {
            const updatedPrices = androidPrices.map(item => {
                const randomChange = Math.floor(Math.random() * 100000) - 50000;
                return { ...item, price: Math.max(item.price + randomChange, 0) };
            });
    
            const message = {
                type: 'android',
                body: updatedPrices
            }

           sendMessage('prices', message)
        }, 2000)
    }
}

const server = new Server();
server.startServer();