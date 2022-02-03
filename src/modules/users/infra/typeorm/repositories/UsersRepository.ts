import User from "../entities/User";
import { isEqual } from 'date-fns';
// import { EntityRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';

import IUsersRepository from "src/modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "src/modules/users/dtos/ICreateUserDTO";

// @EntityRepository(Appointment)
// extends Repository<Appointment>

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async create({
        userData
    }: ICreateUserDTO): Promise<User> {
        const appointment = this.ormRepository.create(userData);

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
