import { Router } from 'express'
import { testPostExample } from '../controllers/example.controller';

const router: Router = Router()

const routes = (): void => {
    router.post('/', testPostExample);
}

routes()

export default router