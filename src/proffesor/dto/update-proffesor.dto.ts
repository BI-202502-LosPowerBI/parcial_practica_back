import { PartialType } from '@nestjs/mapped-types';
import { CreateProffesorDto } from './create-proffesor.dto';

export class UpdateProffesorDto extends PartialType(CreateProffesorDto) {}
