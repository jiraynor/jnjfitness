import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { QnARepository } from './repository/qna.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([QnARepository, TrainerRepository, UserRepository])
  ],
  controllers: [QnaController],
  providers: [QnaService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class QnaModule {}
