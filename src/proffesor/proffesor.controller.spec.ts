import { Test, TestingModule } from '@nestjs/testing';
import { ProffesorController } from './proffesor.controller';
import { ProffesorService } from './proffesor.service';

describe('ProffesorController', () => {
  let controller: ProffesorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProffesorController],
      providers: [ProffesorService],
    }).compile();

    controller = module.get<ProffesorController>(ProffesorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
