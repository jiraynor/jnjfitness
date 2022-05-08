import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import { Trainer } from 'src/entities/trainer.entity';
import * as config from 'config';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(TrainerRepository)
    private trainerRepository: TrainerRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<any> {
    const { id, categorization } = payload;

    switch (categorization) {
      case 'trainer':
        const trainer: Trainer = await this.trainerRepository.findOne(id);

        if (!trainer) throw new UnauthorizedException();

        return { trainer, categorization };
      case 'user':
        const user: User = await this.userRepository.findOne(id);

        if (!user) throw new UnauthorizedException();

        return { user, categorization };
    }
  }
}
