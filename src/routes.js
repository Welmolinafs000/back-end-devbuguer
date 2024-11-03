import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controlles/UserController';
import SessionController from './app/controlles/SessionController';
import productsController from './app/controlles/productsController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.post('/products', upload.single('file'), productsController.store);
routes.get('/products', productsController.index);

export default routes;
