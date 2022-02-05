import { Router } from 'express';
import { userVerify } from '../middlewares/userVerify';
import UsersController from '../controllers/UsersController';

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.get('/', usersController.index);
userRoutes.post('/', userVerify, usersController.create);
