import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST')!;
  }

  get dbPort(): number {
    return +this.configService.get<number>('DB_PORT')!;
  }

  get dbUser(): string {
    return this.configService.get<string>('DB_USER')!;
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD')!;
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME')!;
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')!;
  }

  get jwtExpiresIn(): StringValue {
    return (this.configService.get('JWT_EXPIRES_IN') || '300s') as StringValue;
  }

  get jwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')!;
  }

  get refreshTokenExpiresIn(): StringValue {
    return (this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN') ||
      '7d') as StringValue;
  }

  get isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  get adminEmail(): string {
    return this.configService.get<string>('SUPER_ADMIN_EMAIL')!;
  }

  get adminPassword(): string {
    return this.configService.get<string>('SUPER_ADMIN_PASSWORD')!;
  }
}
