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
import { Notice } from 'src/entities/notice.entity';
import { noAuthReturn, ResultType } from 'src/utils/custom-type';
import {
  GetNoticeListConditionDto,
  UpdateNoticeDto,
  WriteNoticeDto,
} from './dto/notice.dto';
import { NoticeService } from './notice.service';

@Controller('api/notice')
@UseGuards(AuthGuard())
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Post('/writeNotice')
  writeNotice(
    @Body(ValidationPipe) dto: WriteNoticeDto,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    const writerId = req.user.trainer.id;

    return this.noticeService.writeNotice(dto, writerId);
  }

  @Get('/getNotice/:notice_num')
  getNotice(@Param('notice_num') notice_num: number): Promise<Notice> {
    return this.noticeService.getNotice(notice_num);
  }

  @Get('/getNoticeList')
  async getNoticeList(): Promise<Notice[]> {
    return await this.noticeService.getNoticeList();
  }

  @Post('/getNoticeListCondition')
  async getNoticeListCondition(
    @Body(ValidationPipe) dto: GetNoticeListConditionDto,
    @GetCategorization() categorization: string,
  ): Promise<Notice[]> {
    if (categorization !== 'trainer') return [];
    return await this.noticeService.getNoticeListCondition(dto);
  }

  @Patch('/updateNotice')
  updateNotice(
    @Body(ValidationPipe) dto: UpdateNoticeDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.noticeService.updateNotice(dto);
  }

  @Delete('/deleteNotice/:notice_num')
  deleteNotice(
    @Param('notice_num') notice_num: number,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.noticeService.deleteNotice(notice_num);
  }
}
