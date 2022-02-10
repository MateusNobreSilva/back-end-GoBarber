import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
//console.log("CreateAppointmentService: " + CreateAppointmentService);
export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;
    //  console.log("BODY: " + JSON.stringify(request.body));


    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      day,
      month,
      year
    });

    return response.json(appointments);
  }
}