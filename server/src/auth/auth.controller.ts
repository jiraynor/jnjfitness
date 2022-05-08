import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  ValidationPipe,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInTrainerDto } from 'src/user/dto/trainer.dto';
import { SignInUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { ResultType } from 'src/utils/custom-type';
import { AuthService } from './auth.service';
import { GetCategorization } from './custom.decorator';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  getAuth(@GetCategorization() categorization: string): string {
    return categorization;
  }

  @Post('/signinTrainer')
  async signInTrainer(
    @Body(ValidationPipe) dto: SignInTrainerDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.signInTrainer(dto);

    const trainer = await this.userService.getTrainer(dto.id);

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    res.cookie('accessToken', accessToken.accessToken, {
      path: '/',
      expires,
    });

    res.cookie('user', trainer, {
      path: '/',
      expires,
    });

    res.cookie('userType', 'trainer', {
      path: '/',
      expires,
    });

    return accessToken;
  }

  @Post('/signinUser')
  async signInUser(
    @Body(ValidationPipe) dto: SignInUserDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.signInUser(dto);
    const user = await this.userService.getUser(dto.id);

    user.password = '********';

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);

    res.cookie('accessToken', accessToken.accessToken, {
      path: '/',
      expires,
    });

    res.cookie('user', user, {
      path: '/',
      expires,
    });

    res.cookie('userType', 'user', {
      path: '/',
      expires,
    });

    return accessToken;
  }

  @Get('/signout')
  signOut(@Res({ passthrough: true }) res): ResultType {
    res.cookie('accessToken', '', {
      maxAge: 0,
    });

    res.cookie('user', '', {
      maxAge: 0,
    });

    res.cookie('userType', '', {
      maxAge: 0,
    });

    return new ResultType(true, '로그아웃에 성공했습니다.');
  }
}
