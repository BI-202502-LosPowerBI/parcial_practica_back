import { IsString, Length, MinLength,  } from "class-validator";

export class CreateProffesorDto {

    @IsString()
    @Length(9, 9)
    carnet: string;

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @MinLength(3)
    departamento: string;
}