import { EntityRepository, Like, Repository } from 'typeorm';

import { Trainer } from 'src/entities/trainer.entity';
import { CreateTrainerDto, UpdateTrainerDto } from '../dto/trainer.dto';
import * as bcrypt from 'bcryptjs';
import {
  databaseError,
  ResultType,
  successRegist,
  successUpdate,
} from 'src/utils/custom-type';

@EntityRepository(Trainer)
export class TrainerRepository extends Repository<Trainer> {
  async signUpTrainer(dto: CreateTrainerDto): Promise<ResultType> {
    const { id, password, name, tel, birth, gender } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const trainer = this.create({
      id,
      password: hashedPassword,
      name,
      tel,
      birth,
      gender,
    });

    try {
      await this.save(trainer);
    } catch (e) {
      return databaseError;
    }
    return successRegist;
  }

  async updateTrainer(dto: UpdateTrainerDto): Promise<ResultType> {
    const { id, name, tel, birth, gender } = dto;

    const trainer = this.create({
      id,
      name,
      tel,
      birth,
      gender,
    });

    try {
      this.save(trainer);
    } catch (e) {
      return databaseError;
    }
    return successUpdate;
  }

  async getTrainersName(name: string): Promise<Trainer[]> {
    try {
      return this.find({ name: Like(`%${name}%`) });
    } catch (e) {
      return [];
    }
  }
}
