import { Between, EntityRepository, Like, MoreThan, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import {
  databaseError,
  ResultType,
  successRegist,
  successUpdate,
} from 'src/utils/custom-type';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUpUser(
    dto: CreateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    const {
      id,
      password,
      name,
      address,
      tel,
      gender,
      birth,
      note,
      startDate,
      endDate,
    } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      id,
      password: hashedPassword,
      name,
      address,
      tel,
      gender,
      birth,
      note,
      startDate,
      endDate,
    });

    try {
      await this.save(user);
    } catch (e) {
      return databaseError;
    }
    return successRegist;
  }

  async getUserExpirationList(today: string, date: string): Promise<User[]> {
    try {
      return this.find({
        where: { endDate: Between(today, date) },
        order: { endDate: 'ASC' },
      });
    } catch (e) {
      return [];
    }
  }

  async updateUser(dto: UpdateUserDto): Promise<ResultType> {
    const { id, name, address, tel, birth, gender, note, startDate, endDate } =
      dto;

    const user = this.create({
      id,
      name,
      address,
      tel,
      gender,
      birth,
      note,
      startDate,
      endDate,
    });

    try {
      this.save(user);
    } catch (e) {
      return databaseError;
    }
    return successUpdate;
  }

  async getUsersConditionName(name: string): Promise<User[]> {
    try {
      return this.find({ name: Like(`%${name}%`) });
    } catch (e) {
      return [];
    }
  }
}
