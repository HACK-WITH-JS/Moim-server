import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Moim')
  .setDescription('Moim API description')
  .setVersion('1.0')
  .addTag('Moim')
  .build();
