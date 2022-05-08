import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/entities/notice.entity';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import {
  authorNotValid,
  databaseError,
  ResultType,
  successDelete,
} from 'src/utils/custom-type';
import {
  GetNoticeListConditionDto,
  UpdateNoticeDto,
  WriteNoticeDto,
} from './dto/notice.dto';
import { NoticeRepository } from './repository/notice.repository';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeRepository)
    private noticeRepository: NoticeRepository,
    @InjectRepository(TrainerRepository)
    private trainerRepository: TrainerRepository,
  ) {}

  async writeNotice(dto: WriteNoticeDto, id: string): Promise<ResultType> {
    const writer = await this.trainerRepository.findOne(id);
    if (!writer) return authorNotValid;

    dto.content
      .replace('\n', '<br />')
      .replace('<', '&lt;')
      .replace('>', '&gt;');

    return await this.noticeRepository.writeNotice(dto, writer);
  }

  async getNotice(notice_num: number): Promise<Notice> {
    return this.noticeRepository.findOne(notice_num);
  }

  async getNoticeList(): Promise<Notice[]> {
    const notices = await this.noticeRepository.getNoticeList();
    for (const notice of notices) notice.writer.password = '********';

    return notices;
  }

  async getNoticeListCondition(
    dto: GetNoticeListConditionDto,
  ): Promise<Notice[]> {
    let notices: Notice[];

    switch (dto.condition) {
      case 'title':
        notices = await this.noticeRepository.getNoticeListConditionTitle(
          dto.content,
        );
        break;
      case 'content':
        notices = await this.noticeRepository.getNoticeListConditionContent(
          dto.content,
        );
        break;
      default:
        return [];
    }

    for (const notice of notices) notice.writer.password = '********';

    return notices;
  }

  async updateNotice(dto: UpdateNoticeDto): Promise<ResultType> {
    dto.content
      .replace('\n', '<br />')
      .replace('<', '&lt;')
      .replace('>', '&gt;');
    return await this.noticeRepository.updateNotice(dto);
  }

  async deleteNotice(notice_num: number): Promise<ResultType> {
    try {
      await this.noticeRepository.delete(notice_num);
    } catch (e) {
      return databaseError;
    }
    return successDelete;
  }
}
