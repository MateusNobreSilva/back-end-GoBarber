import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import Appointment from '../../typeorm/entities/Appointment';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import { container } from "tsyringe";

export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);
        //  const appointmentsRepository = new AppointmentsRepository();
        //       const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        // const createAppointment = new CreateAppointmentService();
        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id });
        return response.json(appointment);
    }
}
