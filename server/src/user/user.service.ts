import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/entities/trainer.entity';
import { User } from 'src/entities/user.entity';
import {
  databaseError,
  existenId,
  nonExistenId,
  ResultType,
  successDelete,
} from 'src/utils/custom-type';
import { CreateTrainerDto, UpdateTrainerDto } from './dto/trainer.dto';
import {
  CreateUserDto,
  GetUserConditionDto,
  UpdateUserDto,
} from './dto/user.dto';
import { TrainerRepository } from './repository/trainer.repository';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(TrainerRepository)
    private trainerRepository: TrainerRepository,
  ) {}

  async signUpTrainer(dto: CreateTrainerDto): Promise<ResultType> {
    const trainer = await this.trainerRepository.findOne(dto.id);

    if (trainer) return existenId;

    return await this.trainerRepository.signUpTrainer(dto);
  }

  async signUpUser(dto: CreateUserDto): Promise<ResultType> {
    const trainer = await this.userRepository.findOne(dto.id);

    if (trainer) return existenId;
    return await this.userRepository.signUpUser(dto);
  }

  async checkTrainer(id: string): Promise<ResultType> {
    const trainer = await this.trainerRepository.findOne(id);

    if (trainer) return existenId;

    return nonExistenId;
  }

  async checkUser(id: number): Promise<ResultType> {
    const user = await this.userRepository.findOne(id);

    if (user) return existenId;

    return nonExistenId;
  }

  async getTrainer(id: string): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne(id);
    if (trainer) trainer.password = '********';
    return trainer;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user) user.password = '********';
    return user;
  }

  async getTrainers(): Promise<Trainer[]> {
    const trainers = await this.trainerRepository.find();

    for (let x of trainers) x.password = '********';

    return trainers;
  }

  async getTrainersName(id: string): Promise<Trainer[]> {
    const trainers = await this.trainerRepository.getTrainersName(id);
    if (!trainers) return [];

    for (let x of trainers) x.password = '********';
    return trainers;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    for (let x of users) x.password = '********';

    return users;
  }

  async getUsersCondition(dto: GetUserConditionDto): Promise<User[]> {
    let users: User[];

    switch (dto.condition) {
      case 'id':
        if (!/^-?\d+$/.test(dto.content)) return [];
        users = await this.userRepository.find({ id: +dto.content });
        break;
      case 'name':
        users = await this.userRepository.getUsersConditionName(dto.content);
        break;
      default:
        return;
    }

    for (let x of users) x.password = '********';

    return users;
  }

  async getUserExpirationList(): Promise<User[]> {
    const day = new Date();

    day.setHours(day.getHours() + 9);
    const today = day.toISOString().substring(0, 10);
    day.setDate(day.getDate() + 7);
    const date = day.toISOString().substring(0, 10);

    const users = await this.userRepository.getUserExpirationList(today, date);
    for (let x of users) x.password = '********';

    return users;
  }

  async updateTrainer(dto: UpdateTrainerDto): Promise<ResultType> {
    const trainer = await this.trainerRepository.findOne({ id: dto.id });

    if (!trainer) return nonExistenId;

    return await this.trainerRepository.updateTrainer(dto);
  }

  async updateUser(dto: UpdateUserDto): Promise<ResultType> {
    const user = await this.userRepository.findOne({ id: dto.id });

    if (!user) return nonExistenId;

    return await this.userRepository.updateUser(dto);
  }

  async deleteUser(id: number): Promise<ResultType> {
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      return databaseError;
    }
    return successDelete;
  }

  async deleteTrainer(id: string): Promise<ResultType> {
    try {
      await this.trainerRepository.delete(id);
    } catch (e) {
      return databaseError;
    }
    return successDelete;
  }
}
