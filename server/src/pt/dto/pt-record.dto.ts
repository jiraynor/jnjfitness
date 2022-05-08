import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePTRecordDto {
    @IsNotEmpty()
    @IsString()
    record_date: string;

    @IsNotEmpty()
    @IsString()
    record_content: string;

    @IsNotEmpty()
    @IsInt()
    ptId: number;
}

export class UpdatePTRecordDto {
    @IsNotEmpty()
    @IsInt()
    record_id: number;

    @IsNotEmpty()
    @IsString()
    record_date: string;

    @IsNotEmpty()
    @IsString()
    record_content: string;
}