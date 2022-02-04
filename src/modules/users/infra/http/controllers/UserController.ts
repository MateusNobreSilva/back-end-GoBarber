import { Request, Response } from "express";
import { container } from "tsyringe";
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

// import CreateUserService from '@modules/users/services/CreateUserService';
import CreateUserService from '../../../services/CreateUserService';
// import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { RepositoryNotTreeError } from 'typeorm';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class USersController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const usersRepository = new UsersRepository();
            const { name, email, password } = request.body;

            const createUser = container.resolve(CreateUserService);

            const user = await createUser.execute({
                name,
                email,
                password,
            });

            delete user.password;

            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message })

        }
    }
}
