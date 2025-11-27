import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-key.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiKeyService {

    constructor(

        @InjectRepository(ApiKey)
        private readonly apiKeyRepository: Repository<ApiKey>

    ) {}

    async create(key: string) {
        try {
            const apiKey = this.apiKeyRepository.create({ key });
            return await this.apiKeyRepository.save(apiKey);
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
            
    async findByKey(key: string) {
        try {
            const apiKey = await this.apiKeyRepository.findOne({ where: { key } });
            return apiKey;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async decrementAttempts(apiKey: ApiKey) {
        try {
            if (apiKey.attempts < 1) {
                throw new BadRequestException('No attempts left for this API key');
            }

            apiKey.attempts -= 1;

            return await this.apiKeyRepository.save(apiKey);
        } 
        catch (error) {
            throw new this.handleDBExceptions(error);
        }
    }

    private handleDBExceptions( error: any ) {
    
        if ( error.code === '23505' ) {
          throw new BadRequestException(error.detail);
        }
    
        console.log(error);
        throw new BadRequestException('Unexpected error, check server logs');
    }
}