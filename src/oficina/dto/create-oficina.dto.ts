import { IsNumber, IsString, Length, Min, MinLength } from "class-validator";

export class CreateOficinaDto {

    @IsString()
    @MinLength(3)
    edificio: string;

    @IsNumber()
    @Min(1)
    piso: number;

    @IsString()
    @Length(3, 3)
    numero: string;
}