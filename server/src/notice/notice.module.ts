import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';
import { NoticeRepository } from './repository/notice.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([NoticeRepository, TrainerRepository, UserRepository]),
  ],
  controllers: [NoticeController],
  providers: [NoticeService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class NoticeModule {}
