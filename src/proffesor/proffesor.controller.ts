import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProffesorService } from './proffesor.service';
import { CreateProffesorDto } from './dto/create-proffesor.dto';
import { UpdateProffesorDto } from './dto/update-proffesor.dto';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Controller('proffesor')
export class ProffesorController {
  constructor(private readonly proffesorService: ProffesorService) {}

  @UseGuards(ApiTokenGuard)
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

  @UseGuards(ApiTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProffesorDto: UpdateProffesorDto) {
    return this.proffesorService.update(+id, updateProffesorDto);
  }

  @UseGuards(ApiTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proffesorService.remove(+id);
  }
}
