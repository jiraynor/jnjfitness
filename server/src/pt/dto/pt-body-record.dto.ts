import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePTBodyRecordDto {
    @IsNotEmpty()
    @IsString()
    body_record_date: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNumber()
    height: number;

    @IsNumber()
    shoulder: number;

    @IsNumber()
    chest: number;

    @IsNumber()
    waist: number;

    @IsNumber()
    butt: number;

    @IsNumber()
    thigh: number;

    @IsNumber()
    calf: number;

    @IsNotEmpty()
    @IsInt()
    ptId: number;
}

export class UpdatePTBodyRecordDto {
    @IsNotEmpty()
    @IsInt()
    body_record_id: number;

    @IsNotEmpty()
    @IsString()
    body_record_date: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNumber()
    height: number;

    @IsNumber()
    shoulder: number;

    @IsNumber()
    chest: number;

    @IsNumber()
    waist: number;

    @IsNumber()
    butt: number;

    @IsNumber()
    thigh: number;

    @IsNumber()
    calf: number;
}