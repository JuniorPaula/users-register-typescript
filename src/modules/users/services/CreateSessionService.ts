import 'dotenv/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { ICreateSession } from '../domain/models/ICreateSession';
import { ILoggIn } from '../domain/models/ILoggIn';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

class CreateSessionService {
  constructor(private usersRepositoty: IUsersRepository) {}

  async execute({ email, password }: ILoggIn): Promise<ICreateSession> {
    /** get user by email */
    const user = await this.usersRepositoty.findByEmail(email);

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
