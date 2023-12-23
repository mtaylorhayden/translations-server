import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authGuard = app.get(AuthGuard);

  app.useGlobalGuards(authGuard);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(8080);
}
bootstrap();
