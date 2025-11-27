import { Test, TestingModule } from '@nestjs/testing';
import { ProffesorService } from './proffesor.service';

describe('ProffesorService', () => {
  let service: ProffesorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProffesorService],
    }).compile();

    service = module.get<ProffesorService>(ProffesorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
