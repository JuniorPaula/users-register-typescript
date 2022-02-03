import { Router } from 'express';

/** Router intance */
const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello Dev!' });
});

export default routes;
