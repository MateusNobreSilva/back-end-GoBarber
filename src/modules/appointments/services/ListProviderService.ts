
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
// import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {

    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    });

    return users;

    // return user;
  }
}

export default ListProvidersService;