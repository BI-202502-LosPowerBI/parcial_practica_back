import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { User } from './entities/user.entity';
import { ApiKeyModule } from 'src/api-key/api-key.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User, ApiKey]),
    ApiKeyModule,
  ],
  exports: [UserService],
})
export class UserModule {}
