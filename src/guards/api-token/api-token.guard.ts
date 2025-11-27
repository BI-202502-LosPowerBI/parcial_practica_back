import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Injectable()
export class ApiTokenGuard implements CanActivate {

  constructor(
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async canActivate( context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const apiToken = request.headers['api-token'];

    if (!apiToken) {
      throw new UnauthorizedException('API token is missing');
    }

    const apiKey = await this.apiKeyService.findByKey(apiToken);

    if (!apiKey) {
      throw new UnauthorizedException('Invalid API token');
    }

    if (!apiKey.isActive) {
      throw new UnauthorizedException('API token is inactive');
    }

    if (apiKey.attempts < 1) {
      throw new UnauthorizedException('No attempts left for this API token');
    }

    await this.apiKeyService.decrementAttempts(apiKey);

    return true;
  }
}