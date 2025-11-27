import { Module } from '@nestjs/common';
import { OficinaService } from './oficina.service';
import { OficinaController } from './oficina.controller';
import { Proffesor } from 'src/proffesor/entities/proffesor.entity';
import { Oficina } from './entities/oficina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OficinaController],
  providers: [OficinaService],
  imports: [
    TypeOrmModule.forFeature([Oficina, Proffesor]),
  ],
  exports: [OficinaService],
})
export class OficinaModule {}
