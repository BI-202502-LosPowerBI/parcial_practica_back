import { Injectable } from '@nestjs/common';
import { CreateProffesorDto } from './dto/create-proffesor.dto';
import { UpdateProffesorDto } from './dto/update-proffesor.dto';

@Injectable()
export class ProffesorService {
  create(createProffesorDto: CreateProffesorDto) {
    return 'This action adds a new proffesor';
  }

  findAll() {
    return `This action returns all proffesor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proffesor`;
  }

  update(id: number, updateProffesorDto: UpdateProffesorDto) {
    return `This action updates a #${id} proffesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} proffesor`;
  }
}
