import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { repl } from '@nestjs/core';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';
import { useContainer } from 'class-validator';
import { TransformInterceptor } from './transform.interceptor';
import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: [...process.env.ORIGIN.split(',')],
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(config().app_port, config().app_host);
  new ConsoleLogger('NestApplication').log(
    `Server running on http://${config().app_host}:${config().app_port}`,
  );
  await repl(AppModule);
}
bootstrap();
