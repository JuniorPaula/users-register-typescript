import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

class CreateUserService {
  constructor(private usersRepositoty: IUsersRepository) {}

  async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    /** check if email exists, if yes! throw a new error */
    const emailExists = await this.usersRepositoty.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    /** password hashaded */
    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepositoty.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
