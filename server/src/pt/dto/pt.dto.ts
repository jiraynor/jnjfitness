import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePTDto {
    @IsNotEmpty()
    @IsInt()
    cnt: number;

    @IsString()
    note: string;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsNotEmpty()
    @IsString()
    endTime: string;

    @IsNotEmpty()
    @IsString()
    days: string;

    @IsNotEmpty()
    @IsString()
    startDate: string;

    @IsNotEmpty()
    @IsString()
    endDate: string;

    @IsNotEmpty()
    @IsInt()
    userId: number;
}

export class UpdatePTDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsInt()
    cnt: number;

    @IsString()
    note: string;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsNotEmpty()
    @IsString()
    endTime: string;

    @IsNotEmpty()
    @IsString()
    days: string;

    @IsNotEmpty()
    @IsString()
    startDate: string;

    @IsNotEmpty()
    @IsString()
    endDate: string;
}