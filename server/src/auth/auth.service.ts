import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInTrainerDto } from 'src/user/dto/trainer.dto';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import * as bcrypt from 'bcryptjs';
import { SignInUserDto } from 'src/user/dto/user.dto';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TrainerRepository)
    private trainerRepository: TrainerRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signInTrainer(dto: SignInTrainerDto): Promise<{ accessToken: string }> {
    const { id, password } = dto;
    const trainer = await this.trainerRepository.findOne(id);

    if (trainer && (await bcrypt.compare(password, trainer.password))) {
      const payload = { id, categorization: 'trainer' };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 정보를 확인해 주세요.');
    }
  }

  async signInUser(dto: SignInUserDto): Promise<{ accessToken: string }> {
    const { id, password } = dto;
    const user = await this.userRepository.findOne(id);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id, categorization: 'user' };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 정보를 확인해 주세요.');
    }
  }
}
