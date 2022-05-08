import { PT_Record } from 'src/entities/pt-record.entity';
import { PT } from 'src/entities/pt.entity';
import {
  databaseError,
  ResultType,
  successUpdate,
  successWrite,
} from 'src/utils/custom-type';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePTRecordDto, UpdatePTRecordDto } from '../dto/pt-record.dto';

@EntityRepository(PT_Record)
export class PTRecordRepository extends Repository<PT_Record> {
  async writePTRecord(dto: CreatePTRecordDto, pt: PT): Promise<ResultType> {
    const { record_date, record_content } = dto;

    const pt_record = this.create({
      record_date,
      record_content,
      pt,
    });

    try {
      await this.save(pt_record);
    } catch (e) {
      return databaseError;
    }

    return successWrite;
  }

  async updatePTRecord(dto: UpdatePTRecordDto): Promise<ResultType> {
    const { record_id, record_date, record_content } = dto;

    const pt_record = this.create({
      record_id,
      record_date,
      record_content,
    });

    try {
      await this.save(pt_record);
    } catch (e) {
      return databaseError;
    }

    return successUpdate;
  }
}
