import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

//import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUserTokensRepository,

  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Users do not exists');
    }

    const { token } = await this.usersTokensRepository.generate(user.id);
    //const { token } = await this.userTokensRepository.generate(user.id);
    //  await this.mailProvider.sendEmail(email, 'Pedido de recuperação de senha recebido.');
    this.mailProvider.sendEmail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );


  }
}

export default SendForgotPasswordEmailService;