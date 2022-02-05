import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

/** User customer repository from typeorm */
@EntityRepository(User)
class UsersRepository extends Repository<User> {
  /** find user by name */
  async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { name } });
    return user;
  }

  /** find user by id */
  async findByid(id: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { id } });
    return user;
  }

  /** find user by email */
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });
    return user;
  }
}

export default UsersRepository;
