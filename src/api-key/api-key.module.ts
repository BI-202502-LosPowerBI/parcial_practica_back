import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey} from './entities/api-key.entity';
import { ApiTokenGuard } from 'src/guards/api-token/api-token.guard';

@Module({
  providers: [ApiKeyService, ApiTokenGuard],
  controllers: [ApiKeyController],
  imports: [
    TypeOrmModule.forFeature([ApiKey]),
  ],
  exports: [ApiKeyService, ApiTokenGuard],
})
export class ApiKeyModule {}