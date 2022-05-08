import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class WriteNoticeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  reg_date: string;
}

export class UpdateNoticeDto {
  @IsNotEmpty()
  @IsInt()
  notice_num: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class GetNoticeListConditionDto {
  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsString()
  content: string;
}
