import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionService from '../../../services/CreateSessionService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const userRepository = new UsersRepository();
    const createSession = new CreateSessionService(userRepository);

    const user = await createSession.execute({ email, password });

    return response.json(instanceToInstance(user));
  }
}
