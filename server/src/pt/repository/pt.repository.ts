import { PT } from 'src/entities/pt.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { User } from 'src/entities/user.entity';
import {
  databaseError,
  ResultType,
  successRegist,
  successUpdate,
} from 'src/utils/custom-type';
import {
  EntityRepository,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreatePTDto, UpdatePTDto } from '../dto/pt.dto';

@EntityRepository(PT)
export class PTRepository extends Repository<PT> {
  async registPT(
    dto: CreatePTDto,
    trinaer: Trainer,
    user: User,
  ): Promise<ResultType> {
    const { cnt, note, startTime, endTime, days, startDate, endDate } = dto;

    const pt = this.create({
      cnt,
      note,
      startTime,
      endTime,
      days,
      startDate,
      endDate,
      trainer: trinaer,
      user: user,
    });

    try {
      await this.save(pt);
    } catch (e) {
      return databaseError;
    }

    return successRegist;
  }

  async getPTListToMyToday(
    trainer: Trainer,
    day: string,
    date: string,
  ): Promise<PT[]> {
    try {
      return await this.find({
        where: {
          trainer,
          days: Like(`%${day}%`),
          startDate: LessThanOrEqual(date),
          endDate: MoreThanOrEqual(date),
        },
        order: {
          startTime: 'ASC',
        },
      });
    } catch (e) {
      return [];
    }
  }

  async updatePT(dto: UpdatePTDto): Promise<ResultType> {
    const { id, cnt, note, startTime, endTime, days, startDate, endDate } = dto;

    const pt = this.create({
      id,
      cnt,
      note,
      startTime,
      endTime,
      days,
      startDate,
      endDate,
    });

    try {
      this.save(pt);
    } catch (e) {
      return databaseError;
    }

    return successUpdate;
  }
}
