import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proffesor } from './entities/proffesor.entity';
import { Repository } from 'typeorm';
import { CreateProffesorDto } from './dto/create-proffesor.dto';
import { UpdateProffesorDto } from './dto/update-proffesor.dto';
import { OficinaService } from 'src/oficina/oficina.service';

@Injectable()
export class ProffesorService {

  constructor(

    @InjectRepository(Proffesor)
    private readonly proffesorRepository: Repository<Proffesor>,

  ) {}

  async create(createProffesorDto: CreateProffesorDto) {
    try {
      const proffesor = this.proffesorRepository.create(createProffesorDto);
      return await this.proffesorRepository.save(proffesor);
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const proffesores = await this.proffesorRepository.find({
        relations: { oficina: true, cursos: true }
      });
      return proffesores;
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const proffesor = await this.proffesorRepository.findOne({
        where: { id },
        relations: { oficina: true, cursos: true }
      });

      if ( !proffesor ) {
        throw new NotFoundException(`Proffesor with id ${ id } not found`);
      }

      return proffesor;
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: number, updateProffesorDto: UpdateProffesorDto) {
    try {
      const proffesor = await this.proffesorRepository.preload({
        id,
        ...updateProffesorDto
      });

      if ( !proffesor ) {
        throw new NotFoundException(`Proffesor with id ${ id } not found`);
      }

      return await this.proffesorRepository.save(proffesor);
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const proffesor = await this.proffesorRepository.findOne({
        where: { id },
        relations: { oficina: true, cursos: true }
      });

      if ( !proffesor ) {
        throw new NotFoundException(`Proffesor with id ${ id } not found`);
      }

      if ( proffesor.cursos && proffesor.cursos.length > 0 ) {
        throw new BadRequestException(`Cannot delete proffesor with id ${ id } because has assigned cursos`);
      }

      if ( proffesor.oficina ) {
        throw new BadRequestException(`Cannot delete proffesor with id ${ id } because has an assigned oficina`);
      }

      return await this.proffesorRepository.remove(proffesor);
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' ) {
      throw new BadRequestException(error.detail);
    }

    console.log(error);
    throw new BadRequestException('Unexpected error, check server logs');
  }
}