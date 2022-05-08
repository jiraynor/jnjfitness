import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { BoardClass } from 'src/enum/board-class.enum';

export class WriteQnADto {
  @IsNotEmpty()
  board_class: BoardClass;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  reg_datetime: string;
}

export class WriteQnAReplyDto {
  @IsNotEmpty()
  @IsString()
  reply_content: string;

  @IsNotEmpty()
  @IsString()
  reply_datetime: string;

  @IsNotEmpty()
  @IsInt()
  board_num: number;
}

export class UpdateQnADto {
  @IsNotEmpty()
  @IsInt()
  board_num: number;

  @IsNotEmpty()
  board_class: BoardClass;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateQnAReplyDto {
  @IsNotEmpty()
  @IsInt()
  board_num: number;

  @IsNotEmpty()
  @IsString()
  reply_content: string;
}

export class GetQnAListConditionDto {
  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsString()
  content: string;
}
