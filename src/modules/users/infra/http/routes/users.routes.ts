import { request, response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import { container } from "tsyringe";
// import CreateUserService from '@modules/users/services/CreateUserService';
import CreateUserService from '../../../services/CreateUserService';
// import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { RepositoryNotTreeError } from 'typeorm';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UserAvatarController from '../controllers/UserAvatarController';
import USersController from '../controllers/UserController';

//import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new USersController;
const upload = multer(uploadConfig);
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);
export default usersRouter;
