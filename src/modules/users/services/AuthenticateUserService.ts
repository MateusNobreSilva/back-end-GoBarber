import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: String;
}
class AuthenticateUserService {
    public async execute({ email, password }: IRequest): Promise<{ user: User }> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.',401);
        }

        // Usúario autenticado

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        }

    }
}

export default AuthenticateUserService;