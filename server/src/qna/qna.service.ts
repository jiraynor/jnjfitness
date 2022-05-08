import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QnA } from 'src/entities/qna.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import {
  UpdateQnADto,
  WriteQnADto,
  UpdateQnAReplyDto,
  WriteQnAReplyDto,
  GetQnAListConditionDto,
} from './dto/qna.dto';
import { QnARepository } from './repository/qna.repository';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import {
  authorNotValid,
  databaseError,
  noAuthReturn,
  nonExistenBoard,
  ResultType,
  successDelete,
} from 'src/utils/custom-type';

@Injectable()
export class QnaService {
  constructor(
    @InjectRepository(QnARepository)
    private qnaRepository: QnARepository,
    @InjectRepository(TrainerRepository)
    private trainerRepository: TrainerRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async writeQnA(dto: WriteQnADto, userId: number): Promise<ResultType> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) return authorNotValid;

    return await this.qnaRepository.writeQnA(dto, user);
  }

  async writeQnAReply(
    dto: WriteQnAReplyDto,
    writerId: string,
  ): Promise<ResultType> {
    const trainer = await this.trainerRepository.findOne({ id: writerId });
    if (!trainer) return authorNotValid;

    const qna = await this.qnaRepository.findOne({ board_num: dto.board_num });
    if (!qna) return nonExistenBoard;

    return await this.qnaRepository.writeQnAReply(dto, trainer);
  }

  async getQnA(board_num: number): Promise<QnA> {
    const qna = await this.qnaRepository.findOne({ board_num });

    qna.user.password = '********';

    return qna;
  }

  async getQnAList(): Promise<QnA[]> {
    return await this.qnaRepository.getList();
  }

  async getQnAListUser(id: number): Promise<QnA[]> {
    const user = await this.userRepository.findOne(id);

    return this.qnaRepository.getQnAListUser(user);
  }

  async getQnAListCondition(dto: GetQnAListConditionDto): Promise<QnA[]> {
    let qnas: QnA[];

    switch (dto.condition) {
      case 'user':
        const user = await this.userRepository.findOne({ id: +dto.content });
        qnas = await this.qnaRepository.getQnAListUser(user);
        break;
      case 'title':
        qnas = await this.qnaRepository.getQnAListConditionTitle(dto.content);
        break;
      case 'content':
        qnas = await this.qnaRepository.getQnAListConditionContent(dto.content);
        break;
      default:
        return [];
    }

    return qnas;
  }

  async getQnAListUserCondition(
    dto: GetQnAListConditionDto,
    id: number,
  ): Promise<QnA[]> {
    const user = await this.userRepository.findOne(id);
    let qnas: QnA[];

    switch (dto.condition) {
      case 'title':
        qnas = await this.qnaRepository.getQnAListUserConditionTitle(
          dto.content,
          user,
        );
        break;
      case 'content':
        qnas = await this.qnaRepository.getQnAListUserConditionContent(
          dto.content,
          user,
        );
        break;
      default:
        return [];
    }

    return qnas;
  }

  async getQnAListNo(): Promise<QnA[]> {
    return await this.qnaRepository.getNoList();
  }

  async updateQnA(dto: UpdateQnADto, userId: number): Promise<ResultType> {
    const qna = this.qnaRepository.findOne(dto.board_num);

    if (!qna) return nonExistenBoard;
    if (userId !== (await qna).user.id) return noAuthReturn;

    return await this.qnaRepository.updateQnA(dto);
  }

  async updateQnAReply(dto: UpdateQnAReplyDto): Promise<ResultType> {
    const qna = this.qnaRepository.findOne(dto.board_num);

    if (!qna) return nonExistenBoard;

    return await this.qnaRepository.updateQnAReply(dto);
  }

  async deleteQnA(board_num: number, userId: number): Promise<ResultType> {
    const qna = await this.qnaRepository.findOne(board_num);

    if (!qna) return nonExistenBoard;
    if (userId !== qna.user.id) return noAuthReturn;

    try {
      await this.qnaRepository.delete(board_num);
    } catch (e) {
      return databaseError;
    }

    return successDelete;
  }
}
