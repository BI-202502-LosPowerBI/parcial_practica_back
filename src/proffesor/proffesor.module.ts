import { Module } from '@nestjs/common';
import { ProffesorService } from './proffesor.service';
import { ProffesorController } from './proffesor.controller';

@Module({
  controllers: [ProffesorController],
  providers: [ProffesorService],
})
export class ProffesorModule {}
