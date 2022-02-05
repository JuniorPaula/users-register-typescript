import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class UsersController {
  /** return all users[] */
  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(instanceToInstance(users));
  }

  /** create a new user */
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UsersRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
