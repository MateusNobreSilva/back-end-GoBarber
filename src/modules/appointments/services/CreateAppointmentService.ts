import Appointment from "../infra/typeorm/entities/Appointment";
import AppointmentsRepository from "../infra/typeorm/repositories/AppointmentsRepository";
import { startOfHour } from 'date-fns';
import { injectable, inject } from "tsyringe";
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository, UpdateQueryBuilder } from 'typeorm';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
interface Request {
    provider_id: 'uuid';
    date: Date;
}
@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        appointmentsRepository: IAppointmentsRepository,
    ) {

    }

    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) { //o código está certo
            throw new AppError('This appointment is already booked');
        }

        const appointment = await appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        // await appointmentsRepository.save(appointment);

        return appointment;

    }

}

export default CreateAppointmentService
