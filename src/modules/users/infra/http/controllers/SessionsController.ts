import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository();
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);
        //   const response = await authenticateUser.execute({
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    }
}
