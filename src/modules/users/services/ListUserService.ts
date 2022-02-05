import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

class ListUserService {
  constructor(private usersRepositoty: IUsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepositoty.find();
    return users;
  }
}

export default ListUserService;
