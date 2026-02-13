import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // Allow all origins for now to fix production issues
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const port = process.env.PORT ?? 3000;
  logger.log(`Starting application in ${process.env.NODE_ENV || 'development'} mode...`);
  await app.listen(port);
  logger.log(`Application is running on port: ${port}`);
}
bootstrap();
// Trigger Deploy: 2026-02-13 23:20:00
