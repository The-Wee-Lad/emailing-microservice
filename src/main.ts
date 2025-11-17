import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api/v1');
  const swagger_config = new DocumentBuilder()
    .setTitle('Emailing Service Api')
    .setDescription('API documentation for Emailing Service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('api-docs', app, document);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 8000;
  await app.listen(port);
  logger.log(`Emailing Microservice started on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Bootstrap Failed ', err);
  process.exit(-1);
});
