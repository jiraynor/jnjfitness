import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PT_Body_Record } from 'src/entities/pt-body-record.entity';
import { PT_Record } from 'src/entities/pt-record.entity';
import { PT } from 'src/entities/pt.entity';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import {
  databaseError,
  nonExistentPT,
  nonExistentTrainer,
  nonExistentUser,
  ResultType,
  successDelete,
} from 'src/utils/custom-type';
import {
  CreatePTBodyRecordDto,
  UpdatePTBodyRecordDto,
} from './dto/pt-body-record.dto';
import { CreatePTRecordDto, UpdatePTRecordDto } from './dto/pt-record.dto';
import { CreatePTDto, UpdatePTDto } from './dto/pt.dto';
import { PTBodyRecordRepository } from './repository/pt-body-record.repository';
import { PTRecordRepository } from './repository/pt-record.repository';
import { PTRepository } from './repository/pt.repository';

@Injectable()
export class PtService {
  constructor(
    @InjectRepository(PTRepository)
    private ptRepository: PTRepository,
    @InjectRepository(PTRecordRepository)
    private ptRecordRepository: PTRecordRepository,
    @InjectRepository(PTBodyRecordRepository)
    private ptBodyRecordRepository: PTBodyRecordRepository,
    @InjectRepository(TrainerRepository)
    private trainerRepository: TrainerRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async registPT(dto: CreatePTDto, trainerId: string): Promise<ResultType> {
    const user = await this.userRepository.findOne({ id: dto.userId });

    if (!user) return nonExistentUser;

    const trainer = await this.trainerRepository.findOne({ id: trainerId });

    if (!trainer) return nonExistentTrainer;

    return await this.ptRepository.registPT(dto, trainer, user);
  }

  async writePTRecord(dto: CreatePTRecordDto): Promise<ResultType> {
    const pt = await this.ptRepository.findOne({ id: dto.ptId });

    if (!pt) return nonExistentPT;

    return await this.ptRecordRepository.writePTRecord(dto, pt);
  }

  async writePTBodyRecord(dto: CreatePTBodyRecordDto): Promise<ResultType> {
    const pt = await this.ptRepository.findOne({ id: dto.ptId });

    if (!pt) return nonExistentPT;

    return await this.ptBodyRecordRepository.writePTBodyRecord(dto, pt);
  }

  async getPT(id: number): Promise<PT> {
    const pt = await this.ptRepository.findOne(id);

    return pt;
  }

  async getPTRecord(record_id: number): Promise<PT_Record> {
    return await this.ptRecordRepository.findOne(record_id);
  }

  async getPTBodyRecord(body_record_id: number): Promise<PT_Body_Record> {
    return await this.ptBodyRecordRepository.findOne(body_record_id);
  }

  async getPTList(): Promise<PT[]> {
    return await this.ptRepository.find();
  }

  async getPTListToTrainer(trainerId: string): Promise<PT[]> {
    const trainer = await this.trainerRepository.findOne({ id: trainerId });
    return await this.ptRepository.find({ where: { trainer } });
  }

  async getPTListToMyToday(trainerId: string): Promise<PT[]> {
    const trainer = await this.trainerRepository.findOne({ id: trainerId });
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();

    today.setHours(today.getHours() + 9);
    const day = week[today.getDay()];
    const date = today.toISOString().substring(0, 10);

    const pts = await this.ptRepository.getPTListToMyToday(trainer, day, date);

    for (let pt of pts) {
      pt.user.password = '********';
      pt.trainer.password = '********';
    }

    return pts;
  }

  async getPTToUser(userId: number): Promise<PT> {
    const user = await this.userRepository.findOne({ id: userId });
    const pt = await this.ptRepository.findOne({ where: { user } });
    if (pt) {
      pt.trainer.password = '********';
      pt.user.password = '********';
    }

    return pt;
  }

  async updatePT(dto: UpdatePTDto): Promise<ResultType> {
    return await this.ptRepository.updatePT(dto);
  }

  async updatePTRecord(dto: UpdatePTRecordDto): Promise<ResultType> {
    return await this.ptRecordRepository.updatePTRecord(dto);
  }

  async updatePTBodyRecord(dto: UpdatePTBodyRecordDto): Promise<ResultType> {
    return await this.ptBodyRecordRepository.updatePTBodyRecord(dto);
  }

  async deletePT(id: number): Promise<ResultType> {
    const pt = await this.ptRecordRepository.findOne(id);

    try {
      await this.ptBodyRecordRepository.delete(pt);
      await this.ptRecordRepository.delete(pt);
      await this.ptRepository.delete(id);
    } catch (e) {
      return databaseError;
    }

    return successDelete;
  }

  async deletePTRecord(record_id: number): Promise<ResultType> {
    try {
      await this.ptRecordRepository.delete(record_id);
    } catch (e) {
      return databaseError;
    }

    return successDelete;
  }

  async deletePTBodyRecord(body_record_id: number): Promise<ResultType> {
    try {
      await this.ptBodyRecordRepository.delete(body_record_id);
    } catch (e) {
      return databaseError;
    }

    return successDelete;
  }
}
