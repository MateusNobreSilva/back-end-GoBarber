import { getRepository, Repository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto'
import IFindAllProvidersDTO from '../../../dtos/IFindAllProvidersDTO';

import User from '../entities/User';


class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }


  public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      const users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        }
      });
    } else {
      const users = await this.ormRepository.find()
    }

    return users;
  }

  public async create({
    name,
    email,
    password
  }: ICreateUserDto): Promise<User> {
    const appointment = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;
