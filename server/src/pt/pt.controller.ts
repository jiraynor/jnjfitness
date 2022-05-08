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
import { PT_Body_Record } from 'src/entities/pt-body-record.entity';
import { PT_Record } from 'src/entities/pt-record.entity';
import { PT } from 'src/entities/pt.entity';
import { noAuthReturn, ResultType } from 'src/utils/custom-type';
import {
  CreatePTBodyRecordDto,
  UpdatePTBodyRecordDto,
} from './dto/pt-body-record.dto';
import { CreatePTRecordDto, UpdatePTRecordDto } from './dto/pt-record.dto';
import { CreatePTDto, UpdatePTDto } from './dto/pt.dto';
import { PtService } from './pt.service';

@Controller('/api/pt')
@UseGuards(AuthGuard())
export class PtController {
  constructor(private ptService: PtService) {}

  @Post('/registPT')
  async registPT(
    @Body(ValidationPipe) dto: CreatePTDto,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    const trainerId = req.user.trainer.id;

    return this.ptService.registPT(dto, trainerId);
  }

  @Post('/writePTRecord')
  async writePTRecord(
    @Body(ValidationPipe) dto: CreatePTRecordDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.writePTRecord(dto);
  }

  @Post('/writePTBodyRecord')
  async writePTBodyRecord(
    @Body(ValidationPipe) dto: CreatePTBodyRecordDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.writePTBodyRecord(dto);
  }

  @Get('getPT/:id')
  async getPT(
    @Param('id') id: number,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<PT> {
    const pt = await this.ptService.getPT(id);

    if (categorization === 'user') {
      const userId = req.user.user.id;
      if (pt.user.id !== userId) return;
    }

    return pt;
  }

  @Get('getPTRecord/:record_id')
  async getPTRecord(
    @Param('record_id') record_id: number,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<PT_Record> {
    const pt_record = await this.ptService.getPTRecord(record_id);

    if (categorization === 'user') {
      const userId = req.user.user.id;
      const pt = await this.ptService.getPT(pt_record.pt.user.id);
      if (pt.user.id !== userId) return;
    }

    return pt_record;
  }

  @Get('getPTBodyRecord/:body_record_id')
  async getPTBodyRecord(
    @Param('body_record_id') body_record_id: number,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<PT_Body_Record> {
    const pt_body_record = await this.ptService.getPTBodyRecord(body_record_id);

    if (categorization === 'user') {
      const userId = req.user.user.id;
      const pt = await this.ptService.getPT(pt_body_record.pt.user.id);
      if (pt.user.id !== userId) return;
    }

    return pt_body_record;
  }

  @Get('/getPTList')
  async getPTList(@GetCategorization() categorization: string): Promise<PT[]> {
    if (categorization !== 'trainer') return;

    return this.ptService.getPTList();
  }

  @Get('/getPTListToTrainer/:trainerId')
  async getPTListToTrainer(
    @Param('trainerId') trainerId: string,
    @GetCategorization() categorization: string,
  ): Promise<PT[]> {
    if (categorization !== 'trainer') return;

    return this.ptService.getPTListToTrainer(trainerId);
  }

  @Get('/getPTListToMy')
  async getPTListToMy(
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<PT[]> {
    if (categorization !== 'trainer') return [];
    const trainerId = req.user.trainer.id;

    return this.ptService.getPTListToTrainer(trainerId);
  }

  @Get('/getPTListToMyToday')
  async getPTListToMyToday(
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<PT[]> {
    if (categorization !== 'trainer') return;
    const trainerId = req.user.trainer.id;

    return this.ptService.getPTListToMyToday(trainerId);
  }

  @Get('getPTToUser/:userId')
  async getPTToUser(
    @Param('userId') userId: number,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<PT> {
    if (categorization === 'user') {
      const loginUserId = req.user.user.id;

      if (+loginUserId !== +userId) return;
    }

    return await this.ptService.getPTToUser(userId);
  }

  @Patch('/updatePT')
  async updatePT(
    @Body() dto: UpdatePTDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.updatePT(dto);
  }

  @Patch('/updatePTRecord')
  async updatePTRecord(
    @Body() dto: UpdatePTRecordDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.updatePTRecord(dto);
  }

  @Patch('/updatePTBodyRecord')
  async updatePTBodyRecord(
    @Body() dto: UpdatePTBodyRecordDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.updatePTBodyRecord(dto);
  }

  @Delete('/deletePT/:id')
  async deletePT(
    @Param('id') id: number,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.deletePT(id);
  }

  @Delete('/deletePTRecord/:record_id')
  async deletePTRecord(
    @Param('record_id') record_id: number,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.deletePTRecord(record_id);
  }

  @Delete('/deletePTBodyRecord/:body_record_id')
  async deletePTBodyRecord(
    @Param('body_record_id') body_record_id: number,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return this.ptService.deletePTBodyRecord(body_record_id);
  }
}
