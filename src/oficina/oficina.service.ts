import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOficinaDto } from './dto/create-oficina.dto';
import { UpdateOficinaDto } from './dto/update-oficina.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Oficina } from './entities/oficina.entity';
import { Repository } from 'typeorm';
import { Proffesor } from 'src/proffesor/entities/proffesor.entity';

@Injectable()
export class OficinaService {

  constructor(

    @InjectRepository(Oficina) 
    private readonly oficinaRepository: Repository<Oficina>,
    
    @InjectRepository(Proffesor) 
    private readonly proffesorRepository: Repository<Proffesor>,

  ) {}
  
  async create(createOficinaDto: CreateOficinaDto) {
    try {
      const oficina = this.oficinaRepository.create(createOficinaDto);
      return await this.oficinaRepository.save(oficina);
    }
    catch (error) {
      console.log(error);
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      const oficinas = await this.oficinaRepository.find({
        relations: { proffesor: true }
      });
      return oficinas;
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const oficina = await this.oficinaRepository.findOne({
          where: { id },
          relations: { proffesor: true }
      });
      
      if ( !oficina ) {
        throw new NotFoundException(`Oficina with id ${ id } not found`);
      }

      return oficina;
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: number, updateOficinaDto: UpdateOficinaDto) {
    try {
      const oficina = await this.oficinaRepository.preload({
        id,
        ...updateOficinaDto
      });

      if ( !oficina ) {
        throw new NotFoundException(`Oficina with id ${ id } not found`);
      }

      return await this.oficinaRepository.save(oficina);
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const oficina = await this.oficinaRepository.findOne({
        where: { id },
        relations: { proffesor: true }
      });

      if ( !oficina ) {
        throw new NotFoundException(`Oficina with id ${ id } not found`);
      }

      if ( oficina.proffesor ) {
        throw new BadRequestException(`Cannot delete oficina with id ${ id } because it has an assigned proffesor`);
      }

      return await this.oficinaRepository.remove(oficina);
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async asignarProffesor( oficinaId: number, proffesorId: number ) {
    try {
      const oficina = await this.oficinaRepository.findOne({
        where: { id: oficinaId },
        relations: { proffesor: true }
      });

      if ( !oficina ) {
        throw new NotFoundException(`Oficina with id ${ oficinaId } not found`);
      }

      if ( oficina.proffesor ) {
        throw new BadRequestException(`Oficina with id ${ oficinaId } already has a proffesor assigned`);
      }

      const proffesor = await this.proffesorRepository.findOne({
        where: { id: proffesorId },
        relations: { oficina: true }
      });   

      if ( !proffesor ) {
        throw new NotFoundException(`Proffesor with id ${ proffesorId } not found`);
      }

      if ( proffesor.oficina ) {
        throw new BadRequestException(`Proffesor with id ${ proffesorId } already has an oficina assigned`);
      }

      oficina.proffesor = proffesor;
      return await this.oficinaRepository.save(oficina);
    }
    catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removerProffesor( oficinaId: number ) {
    try {
      const oficina = await this.oficinaRepository.findOne({
        where: { id: oficinaId },
        relations: { proffesor: true }
      });

      if ( !oficina ) {
        throw new NotFoundException(`Oficina with id ${ oficinaId } not found`);
      }

      if ( !oficina.proffesor ) {
        throw new BadRequestException(`Oficina with id ${ oficinaId } has no proffesor assigned`);
      }

      oficina.proffesor = null;
      return await this.oficinaRepository.save(oficina);
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