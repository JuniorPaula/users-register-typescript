import { Router } from 'express';
import userRoutes from '@modules/users/routes/usersRoute';

/** Router intance */
const routes = Router();

routes.use('/users', userRoutes);

export default routes;
