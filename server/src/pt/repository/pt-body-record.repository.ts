import { PT_Body_Record } from 'src/entities/pt-body-record.entity';
import { PT } from 'src/entities/pt.entity';
import {
  databaseError,
  ResultType,
  successUpdate,
  successWrite,
} from 'src/utils/custom-type';
import { EntityRepository, Repository } from 'typeorm';
import {
  CreatePTBodyRecordDto,
  UpdatePTBodyRecordDto,
} from '../dto/pt-body-record.dto';

@EntityRepository(PT_Body_Record)
export class PTBodyRecordRepository extends Repository<PT_Body_Record> {
  async writePTBodyRecord(
    dto: CreatePTBodyRecordDto,
    pt: PT,
  ): Promise<ResultType> {
    const {
      body_record_date,
      weight,
      height,
      shoulder,
      chest,
      waist,
      butt,
      thigh,
      calf,
    } = dto;

    const pt_body_record = this.create({
      body_record_date,
      weight,
      height,
      shoulder,
      chest,
      waist,
      butt,
      thigh,
      calf,
      pt,
    });

    try {
      await this.save(pt_body_record);
    } catch (e) {
      return databaseError;
    }

    return successWrite;
  }

  async updatePTBodyRecord(dto: UpdatePTBodyRecordDto): Promise<ResultType> {
    const {
      body_record_id,
      body_record_date,
      weight,
      height,
      shoulder,
      chest,
      waist,
      butt,
      thigh,
      calf,
    } = dto;

    const pt_body_record = this.create({
      body_record_id,
      body_record_date,
      weight,
      height,
      shoulder,
      chest,
      waist,
      butt,
      thigh,
      calf,
    });

    try {
      await this.save(pt_body_record);
    } catch (e) {
      return databaseError;
    }

    return successUpdate;
  }
}
