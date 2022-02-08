import { Request, Response } from 'express';
import { container } from 'tsyringe';

// import ResetPasswordService from '@modules/users/services/AuthenticateUserService';
import ResetPasswordEmailService from '@modules/users/services/ResetPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {

    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordEmailService);

    await resetPassword.execute({
      token,
      password,
    });


    return response.status(204).json();
  }
}