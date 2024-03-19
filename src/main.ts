import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { HttpExceptionFilter } from './common/filter/http.exception.filter';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);
  // Swagger 설정
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Validation Pipe 설정
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 전역 Exception Filter 설정
  app.useGlobalFilters(new HttpExceptionFilter(Logger));

  // cookie parser
  app.use(cookieParser());
  await app.listen(PORT);

  Logger.log(`Server running on http://localhost:${PORT}`);
}

bootstrap();
