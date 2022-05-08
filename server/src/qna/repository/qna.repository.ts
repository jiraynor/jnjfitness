import { QnA } from 'src/entities/qna.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Like, Repository } from 'typeorm';
import {
  WriteQnADto,
  WriteQnAReplyDto,
  UpdateQnADto,
  UpdateQnAReplyDto,
} from '../dto/qna.dto';
import { ReplyStatus } from 'src/enum/reply-status.enum';
import { Trainer } from 'src/entities/trainer.entity';
import {
  databaseError,
  ResultType,
  successDelete,
  successRegist,
  successUpdate,
  successWrite,
} from 'src/utils/custom-type';

@EntityRepository(QnA)
export class QnARepository extends Repository<QnA> {
  async writeQnA(dto: WriteQnADto, user: User): Promise<ResultType> {
    const { board_class, title, content, reg_datetime } = dto;

    const qna = this.create({
      board_class,
      title,
      content,
      reg_datetime,
      reply_status: ReplyStatus.NO,
      user,
    });

    try {
      await this.save(qna);
    } catch (e) {
      return databaseError;
    }

    return successRegist;
  }

  async writeQnAReply(
    dto: WriteQnAReplyDto,
    reply_writer: Trainer,
  ): Promise<ResultType> {
    const { reply_content, reply_datetime, board_num } = dto;

    const qna = this.create({
      board_num,
      reply_status: ReplyStatus.YES,
      reply_content,
      reply_datetime,
      reply_writer,
    });

    try {
      this.save(qna);
    } catch (e) {
      return databaseError;
    }

    return successWrite;
  }

  async getList(): Promise<QnA[]> {
    return this.find({
      order: { board_num: 'DESC' },
    });
  }

  async getNoList(): Promise<QnA[]> {
    return this.find({
      where: { reply_status: ReplyStatus.NO },
      order: { board_num: 'DESC' },
    });
  }

  async getQnAListConditionTitle(title: string): Promise<QnA[]> {
    try {
      return await this.find({
        where: { title: Like(`%${title}%`) },
        relations: ['user'],
        order: { board_num: 'DESC' },
      });
    } catch (e) {
      console.log('catch');
      return [];
    }
  }

  async getQnAListConditionContent(content: string): Promise<QnA[]> {
    try {
      return await this.find({
        where: { content: Like(`%${content}%`) },
        relations: ['user'],
        order: { board_num: 'DESC' },
      });
    } catch (e) {
      return [];
    }
  }

  async getQnAListUser(user: User): Promise<QnA[]> {
    return this.find({
      where: { user },
      relations: ['user'],
      order: { board_num: 'DESC' },
    });
  }

  async getQnAListUserConditionTitle(
    title: string,
    user: User,
  ): Promise<QnA[]> {
    try {
      return await this.find({
        where: { user, title: Like(`%${title}%`) },
        relations: ['user'],
        order: { board_num: 'DESC' },
      });
    } catch (e) {
      console.log('catch');
      return [];
    }
  }

  async getQnAListUserConditionContent(
    content: string,
    user: User,
  ): Promise<QnA[]> {
    try {
      return await this.find({
        where: { user, content: Like(`%${content}%`) },
        relations: ['user'],
        order: { board_num: 'DESC' },
      });
    } catch (e) {
      return [];
    }
  }

  async updateQnA(dto: UpdateQnADto): Promise<ResultType> {
    const { board_num, board_class, title, content } = dto;

    const qna = this.create({
      board_num,
      board_class,
      title,
      content,
    });

    try {
      this.save(qna);
    } catch (e) {
      return databaseError;
    }

    return successUpdate;
  }

  async updateQnAReply(dto: UpdateQnAReplyDto): Promise<ResultType> {
    const { board_num, reply_content } = dto;

    const qna = this.create({
      board_num,
      reply_content,
    });

    try {
      this.save(qna);
    } catch (e) {
      return databaseError;
    }

    return successUpdate;
  }
}
