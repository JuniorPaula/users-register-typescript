import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { sessionVerify } from '../middlewares/sessionVerify';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post('/', sessionVerify, sessionController.create);

export default sessionRoutes;
