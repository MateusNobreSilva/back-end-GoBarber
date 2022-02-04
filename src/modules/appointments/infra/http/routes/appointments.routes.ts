import { request, Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const AppointmentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;
