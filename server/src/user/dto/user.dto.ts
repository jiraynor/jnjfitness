import {
  IsInt,
  IsString,
  IsNotEmpty,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  Length,
} from 'class-validator';
import { Gender } from 'src/enum/gender.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[A-Za-z\d!@#?_]{8,30}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(13)
  tel: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  birth: string;

  @IsString()
  note: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;
}

export class SignInUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^[A-Za-z\d!@#?_]{8,30}$/)
  password: string;
}

export class GetUserConditionDto {
  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsString()
  content: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(13)
  tel: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  birth: string;

  @IsString()
  note: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;
}

export class DeleteUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
