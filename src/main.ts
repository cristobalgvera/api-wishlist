import { EnvironmentService } from '@core/environment';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors();

  const environmentService = app.get(EnvironmentService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (environmentService.get('IS_SWAGGER_ENABLED')) enableSwagger(app);

  const logger = app.get(Logger);
  const port = environmentService.get('PORT');

  await app.listen(port, () => {
    logger.log(`Listening on port ${port}`);
  });
}

function enableSwagger(app: INestApplication) {
  const SWAGGER_PATH = 'api-doc';

  const config = new DocumentBuilder()
    .setTitle('Server Wishlist')
    .setExternalDoc('Postman collection', `${SWAGGER_PATH}-json`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_PATH, app, document);
}

bootstrap();
