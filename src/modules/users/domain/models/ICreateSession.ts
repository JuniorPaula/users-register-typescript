import User from '@modules/users/infra/typeorm/entities/User';

export interface ICreateSession {
  user: User;
  token: string;
}
