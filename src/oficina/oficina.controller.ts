import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OficinaService } from './oficina.service';
import { CreateOficinaDto } from './dto/create-oficina.dto';
import { UpdateOficinaDto } from './dto/update-oficina.dto';

@Controller('oficina')
export class OficinaController {
  constructor(private readonly oficinaService: OficinaService) {}

  @Post()
  create(@Body() createOficinaDto: CreateOficinaDto) {
    return this.oficinaService.create(createOficinaDto);
  }

  @Get()
  findAll() {
    return this.oficinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oficinaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOficinaDto: UpdateOficinaDto) {
    return this.oficinaService.update(+id, updateOficinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oficinaService.remove(+id);
  }

  @Post(':oficinaId/proffesor/:proffesorId')
  asignarProffesor(@Param('oficinaId') oficinaId: string, @Param('proffesorId') proffesorId: string) {
    return this.oficinaService.asignarProffesor(+oficinaId, +proffesorId);
  }
}