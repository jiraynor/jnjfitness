import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { PtModule } from './pt/pt.module';
import { NoticeModule } from './notice/notice.module';
import { QnaModule } from './qna/qna.module';
import { AuthModule } from './auth/auth.module';

import { typeORMConfig } from './configs/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule, 
    PtModule, 
    NoticeModule, 
    QnaModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
