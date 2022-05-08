import {
  Body,
  Controller,
  Post,
  Patch,
  UseGuards,
  ValidationPipe,
  Get,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCategorization } from 'src/auth/custom.decorator';
import { CreateTrainerDto, UpdateTrainerDto } from './dto/trainer.dto';
import {
  CreateUserDto,
  GetUserConditionDto,
  UpdateUserDto,
} from './dto/user.dto';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { Trainer } from 'src/entities/trainer.entity';
import { noAuthReturn, ResultType } from 'src/utils/custom-type';

@Controller('/api/user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signUpTrainer')
  async signUpTrainer(
    @Body(ValidationPipe) dto: CreateTrainerDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;

    return await this.userService.signUpTrainer(dto);
  }

  @Post('/signUpUser')
  async signUpUser(
    @Body(ValidationPipe) dto: CreateUserDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;
    return await this.userService.signUpUser(dto);
  }

  @Get('/checkTrainer/:id')
  async checkTrainer(@Param('id') id: string): Promise<ResultType> {
    return await this.userService.checkTrainer(id);
  }

  @Get('/checkUser/:id')
  async checkUser(@Param('id') id: string): Promise<ResultType> {
    return await this.userService.checkUser(+id);
  }

  @Get('/getTrainer/:id')
  async getTrainer(
    @Param('id') id: string,
    @GetCategorization() categorization: string,
  ): Promise<Trainer> {
    if (categorization !== 'trainer') return;
    return await this.userService.getTrainer(id);
  }

  @Get('/getUser/:id')
  async getUser(
    @Param('id') id: string,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<User> {
    if (categorization !== 'trainer' && req.user.user.id !== +id) return;
    return await this.userService.getUser(+id);
  }

  @Get('/getTrainers')
  async getTrainers(
    @GetCategorization() categorization: string,
  ): Promise<Trainer[]> {
    if (categorization !== 'trainer') return;
    return await this.userService.getTrainers();
  }

  @Get('/getTrainersName/:name')
  async getTrainersName(
    @Param('name') name: string,
    @GetCategorization() categorization: string,
  ): Promise<Trainer[]> {
    if (categorization !== 'trainer') return [];
    return await this.userService.getTrainersName(name);
  }

  @Get('/getUsers')
  async getUsers(@GetCategorization() categorization: string): Promise<User[]> {
    if (categorization !== 'trainer') return [];
    return await this.userService.getUsers();
  }

  @Post('/getUsersCondition')
  async getUsersCondition(
    @Body(ValidationPipe) dto: GetUserConditionDto,
    @GetCategorization() categorization: string,
  ): Promise<User[]> {
    if (categorization !== 'trainer') return [];
    return await this.userService.getUsersCondition(dto);
  }

  @Get('/getUserExpirationList')
  async getUserExpirationList(
    @GetCategorization() categorization: string,
  ): Promise<User[]> {
    if (categorization !== 'trainer') return [];
    return await this.userService.getUserExpirationList();
  }

  @Patch('/updateTrainer')
  async updateTrainer(
    @Body(ValidationPipe) dto: UpdateTrainerDto,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;
    return await this.userService.updateTrainer(dto);
  }

  @Patch('/updateUser')
  async updateUser(
    @Body(ValidationPipe) dto: UpdateUserDto,
    @GetCategorization() categorization: string,
    @Req() req,
  ): Promise<ResultType> {
    if (categorization !== 'trainer' && req.user.user.id !== dto.id)
      return noAuthReturn;
    return await this.userService.updateUser(dto);
  }

  @Delete('/deleteUser/:id')
  async deleteUser(
    @Param('id') id: number,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;
    return await this.userService.deleteUser(id);
  }

  @Delete('/deleteTrainer/:id')
  async deleteTrainer(
    @Param('id') id: string,
    @GetCategorization() categorization: string,
  ): Promise<ResultType> {
    if (categorization !== 'trainer') return noAuthReturn;
    return await this.userService.deleteTrainer(id);
  }
}
