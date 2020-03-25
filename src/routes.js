import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AvatarController from './app/controllers/AvatarController';
import LoginController from './app/controllers/LoginController';

import uploadAvatar from './app/helpers/fileUpload';
import checkAuthToken from './app/middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);

routes.post('/avatars', uploadAvatar, AvatarController.store);

routes.post('/login', LoginController.store);

routes.use(checkAuthToken);

routes.get('/', (req, res) =>
  res.json({ message: 'Hello World', id: req.userId })
);

export default routes;
