import 'dotenv/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  async execute({ email, password }: IRequest): Promise<IResponse> {
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

    /** generate user token */
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
