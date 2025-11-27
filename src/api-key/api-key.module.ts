import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey} from './entities/api-key.entity';

@Module({
  providers: [ApiKeyService],
  controllers: [ApiKeyController],
  imports: [
    TypeOrmModule.forFeature([ApiKey]),
  ],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}