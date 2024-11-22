import { Router } from 'express';
import serverConfigurationController from '../controllers/serverConfiguration.controller';

class ServerConfigurationRoute {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', serverConfigurationController.check);
    }
}

const serverConfigurationRoute = new ServerConfigurationRoute();
export default serverConfigurationRoute.router;