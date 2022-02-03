import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { startOfHour } from 'date-fns';
import AppError from '../errors/AppError';
import { getCustomRepository, UpdateQueryBuilder } from 'typeorm';

interface Request {
    provider_id: 'uuid';
    date: Date;
}

class CreateAppointmentService {

    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) { //o código está certo
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;

    }

}

export default CreateAppointmentService
