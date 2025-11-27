import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProffesorService } from './proffesor.service';
import { CreateProffesorDto } from './dto/create-proffesor.dto';
import { UpdateProffesorDto } from './dto/update-proffesor.dto';

@Controller('proffesor')
export class ProffesorController {
  constructor(private readonly proffesorService: ProffesorService) {}

  @Post()
  create(@Body() createProffesorDto: CreateProffesorDto) {
    return this.proffesorService.create(createProffesorDto);
  }

  @Get()
  findAll() {
    return this.proffesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proffesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProffesorDto: UpdateProffesorDto) {
    return this.proffesorService.update(+id, updateProffesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proffesorService.remove(+id);
  }
}
