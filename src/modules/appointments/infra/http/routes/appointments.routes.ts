import { request, Router } from 'express';
//import { uuid } from 'uuidv4';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import Appointment from '../../typeorm/entities/Appointment';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';


const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    //       const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id });
    return response.json(appointment);


});

export default appointmentsRouter;