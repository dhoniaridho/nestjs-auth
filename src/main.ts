import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { repl } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';
import { useContainer } from 'class-validator';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await repl(AppModule);
  await app.listen(3000);
}
bootstrap();
