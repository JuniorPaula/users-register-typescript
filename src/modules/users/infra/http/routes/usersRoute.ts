import { Router } from 'express';
import { userVerify } from '../../../middlewares/userVerify';
import UsersController from '../controllers/UsersController';
import isAutheticated from '../../../middlewares/isAuthenticated';

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.get('/', isAutheticated, usersController.index);
userRoutes.post('/', userVerify, usersController.create);

export default userRoutes;
