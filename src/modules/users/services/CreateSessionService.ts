import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreateSessionService {
  async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    /** get user by email */
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email', 401);
    }

    const passwordConfimed = await compare(password, user.password);

    if (!passwordConfimed) {
      throw new AppError('Incorrect password', 401);
    }

    return user;
  }
}

export default CreateSessionService;
