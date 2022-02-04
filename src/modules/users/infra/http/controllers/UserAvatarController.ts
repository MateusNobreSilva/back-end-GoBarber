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

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const usersRepository = new UsersRepository();
        const UpdateUserAvatar = container.resolve(UpdateUserAvatarService);
        const user = await UpdateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);

    }
}
