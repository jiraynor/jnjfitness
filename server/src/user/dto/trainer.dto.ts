import { IsNotEmpty, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { Gender } from 'src/enum/gender.enum';

export class CreateTrainerDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    id: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^[A-Za-z\d!@#?_]{8,30}$/)
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(12)
    @MaxLength(13)
    tel: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    birth: string;

    @IsNotEmpty()
    gender: Gender;
}

export class SignInTrainerDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    id: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^[A-Za-z\d!@#?_]{8,30}$/)
    password: string;
}

export class UpdateTrainerDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(12)
    @MaxLength(13)
    tel: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    birth: string;

    @IsNotEmpty()
    gender: Gender;
}