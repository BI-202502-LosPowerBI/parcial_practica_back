import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { ApiKey } from 'src/api-key/entities/api-key.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>
  ) {}

  async create(createUserDto: CreateUserDto) {

    const key = randomBytes(16).toString('hex');
    const apiKey = this.apiKeyRepository.create({ key });

    const user = this.userRepository.create({
      ...createUserDto,
      apiKey
    });

    await this.apiKeyRepository.save(apiKey);
    return await this.userRepository.save(user);
  }
}
