import { Transform } from 'class-transformer';

export class Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  IS_SWAGGER_ENABLED: boolean;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USERNAME: string;

  @Transform(({ value }) => Buffer.from(value, 'base64').toString('ascii'))
  DB_SSL_CA?: string;
}
