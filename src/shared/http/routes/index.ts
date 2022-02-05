import userRoutes from '@modules/users/routes/usersRoute';
import { Router } from 'express';

/** Router intance */
const routes = Router();

routes.get('/users', userRoutes);

export default routes;
