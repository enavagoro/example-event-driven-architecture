import { Request, Response } from "express";
import { sendMessage } from "../../shared/services/messagin.service";

class ServerConfigurationController {
    constructor() {}

    public async check(_: Request, res: Response) {
        try {
            res.status(200).send('Server running :3 ');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}

const serverConfigurationController = new ServerConfigurationController();
export default serverConfigurationController;