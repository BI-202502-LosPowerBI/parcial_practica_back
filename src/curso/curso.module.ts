import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Proffesor } from 'src/proffesor/entities/proffesor.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  imports: [
    TypeOrmModule.forFeature([Curso, Proffesor, Estudiante]),
  ],
  exports: [CursoService],
})
export class CursoModule {}
