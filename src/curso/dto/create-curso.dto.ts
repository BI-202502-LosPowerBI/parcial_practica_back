import { IsNumber, IsString, Length, Min, MinLength } from "class-validator";

export class CreateCursoDto {

    @IsString()
    @Length(8, 8)
    codigo: string;

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsNumber()
    @Min(1)
    creditos: number;
}