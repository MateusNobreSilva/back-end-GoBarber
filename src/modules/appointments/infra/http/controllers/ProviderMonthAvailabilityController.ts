import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProviderService'; // '@modules/appointments/services/CreateAppointmentService';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {

    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderMonthAvailability.execute(request.body);

    return response.json(availability);
  }
}