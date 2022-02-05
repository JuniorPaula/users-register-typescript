import { Router } from 'express';
import userRoutes from '@modules/users/infra/http/routes/usersRoute';
import sessionRoutes from '@modules/users/infra/http/routes/sessionRoutes';

/** Router intance */
const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
