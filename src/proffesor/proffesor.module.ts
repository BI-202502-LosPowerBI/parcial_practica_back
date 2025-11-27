import { Module } from '@nestjs/common';
import { ProffesorService } from './proffesor.service';
import { ProffesorController } from './proffesor.controller';
import { Proffesor } from './entities/proffesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProffesorController],
  providers: [ProffesorService],
  imports: [
    TypeOrmModule.forFeature([Proffesor]),
  ],
  exports: [ProffesorService],
})
export class ProffesorModule {}
