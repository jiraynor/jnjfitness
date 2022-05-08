import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCategorization } from 'src/auth/custom.decorator';
import { QnA } from 'src/entities/qna.entity';
import { noAuthReturn, ResultType } from 'src/utils/custom-type';
import {
  UpdateQnADto,
  UpdateQnAReplyDto,
  WriteQnAReplyDto,
  WriteQnADto,
  GetQnAListConditionDto,
} from './dto/qna.dto';
import { QnaService } from './qna.service';

@Controller('api/qna')
@UseGuards(AuthGuard())
export class QnaController {
  constructor(private qnaService: QnaService) {}

  @Post('/writeQnA')
  writeQnA(
    @Body(ValidationPipe) dto: WriteQnADto,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<ResultType> {
    if (categorization !== 'user') return noAuthReturn;

    const userId = req.user.user.id;

    return this.qnaService.writeQnA(dto, userId);
  }

  @Get('/getQnA/:board_num')
  async getQnA(
    @Param('board_num') board_num: number,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<QnA> {
    const qna = await this.qnaService.getQnA(board_num);

    if (categorization !== 'trainer' && qna.user.id !== req.user.user.id)
      return;

    return qna;
  }

  @Get('/getQnAList')
  getQnAList(@GetCategorization() categorization: string): Promise<QnA[]> {
    if (categorization !== 'trainer') return;

    return this.qnaService.getQnAList();
  }

  @Post('/getQnAListCondition')
  getQnAListCondition(
    @Body(ValidationPipe) dto: GetQnAListConditionDto,
    @GetCategorization() categorization: string,
  ): Promise<QnA[]> {
    if (categorization !== 'trainer') return;

    return this.qnaService.getQnAListCondition(dto);
  }

  @Get('/getQnAListUser')
  getQnAListUser(
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<QnA[]> {
    if (categorization !== 'user') return;
    const userId = req.user.user.id;

    return this.qnaService.getQnAListUser(userId);
  }

  @Post('/getQnAListUserCondition')
  getQnAListUserCondition(
    @Body(ValidationPipe) dto: GetQnAListConditionDto,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<QnA[]> {
    if (categorization !== 'user') return;

    const userId = req.user.user.id;

    return this.qnaService.getQnAListUserCondition(dto, userId);
  }

  @Get('/getQnAListNo')
  getQnAListNo(@GetCategorization() categorization: string): Promise<QnA[]> {
    if (categorization !== 'trainer') return;

    return this.qnaService.getQnAListNo();
  }

  @Patch('/updateQnA')
  updateQnA(
    @Body(ValidationPipe) dto: UpdateQnADto,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<ResultType> {
    if (categorization !== 'user') return noAuthReturn;

    const userId = req.user.user.id;

    return this.qnaService.updateQnA(dto, userId);
  }

  @Delete('/deleteQnA/:board_num')
  deleteQnA(
    @Param('board_num') board_num: number,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<ResultType> {
    if (categorization !== 'user') return noAuthReturn;

    const userId = req.user.user.id;

    return this.qnaService.deleteQnA(board_num, userId);
  }

  @Post('/writeQnAReply')
  writeQnAReply(
    @Body(ValidationPipe) dto: WriteQnAReplyDto,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    const writerId = req.user.trainer.id;

    return this.qnaService.writeQnAReply(dto, writerId);
  }

  @Patch('/updateQnAReply')
  updateQnAReply(
    @Body(ValidationPipe) dto: UpdateQnAReplyDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.qnaService.updateQnAReply(dto);
  }
}
