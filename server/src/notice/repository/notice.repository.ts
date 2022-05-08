import { Notice } from 'src/entities/notice.entity';
import { Trainer } from 'src/entities/trainer.entity';
import {
  databaseError,
  ResultType,
  successDelete,
  successUpdate,
  successWrite,
} from 'src/utils/custom-type';
import { EntityRepository, Repository, Like } from 'typeorm';
import { UpdateNoticeDto, WriteNoticeDto } from '../dto/notice.dto';

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  async writeNotice(dto: WriteNoticeDto, writer: Trainer): Promise<ResultType> {
    const { title, content, reg_date } = dto;

    const notice = this.create({
      title,
      content,
      reg_date,
      writer,
    });

    try {
      await this.save(notice);
    } catch (e) {
      return databaseError;
    }

    return successWrite;
  }

  async getNoticeList(): Promise<Notice[]> {
    try {
      return this.find({
        order: { notice_num: 'DESC' },
      });
    } catch (e) {
      return [];
    }
  }

  async getNoticeListConditionTitle(title: string): Promise<Notice[]> {
    try {
      return this.find({
        where: { title: Like(`%${title}%`) },
        order: { notice_num: 'DESC' },
      });
    } catch (e) {
      return [];
    }
  }

  async getNoticeListConditionContent(content: string): Promise<Notice[]> {
    try {
      return this.find({
        where: { content: Like(`%${content}%`) },
        order: { notice_num: 'DESC' },
      });
    } catch (e) {
      return [];
    }
  }

  async updateNotice(dto: UpdateNoticeDto): Promise<ResultType> {
    const { notice_num, title, content } = dto;

    const notice = this.create({
      notice_num,
      title,
      content,
    });

    try {
      this.save(notice);
    } catch (e) {
      return databaseError;
    }

    return successUpdate;
  }
}
