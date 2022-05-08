import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TrainerRepository } from 'src/user/repository/trainer.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { PtController } from './pt.controller';
import { PtService } from './pt.service';
import { PTBodyRecordRepository } from './repository/pt-body-record.repository';
import { PTRecordRepository } from './repository/pt-record.repository';
import { PTRepository } from './repository/pt.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      UserRepository, 
      TrainerRepository, 
      PTRepository, 
      PTRecordRepository, 
      PTBodyRecordRepository]),
  ],
  controllers: [PtController],
  providers: [PtService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class PtModule {}
