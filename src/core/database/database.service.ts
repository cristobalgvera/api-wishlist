import { EnvironmentService } from '@core/environment';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly environmentService: EnvironmentService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const sharedTypeOrmModuleOptions: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.environmentService.get('DB_HOST'),
      port: this.environmentService.get('DB_PORT'),
      username: this.environmentService.get('DB_USERNAME'),
      password: this.environmentService.get('DB_PASSWORD'),
      database: this.environmentService.get('DB_NAME'),
      autoLoadEntities: true,
      migrations: ['dist/**/migrations/*.js'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
    };

    if (this.environmentService.isProd())
      return {
        ...sharedTypeOrmModuleOptions,
        ssl: {
          ca: this.environmentService.get('DB_SSL_CA'),
        },
      };

    return sharedTypeOrmModuleOptions;
  }
}
