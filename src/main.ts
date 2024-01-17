import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const authGuard = app.get(AuthGuard);
  const rolesGuard = app.get(RolesGuard);

  app.useGlobalGuards(authGuard, rolesGuard);

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
      transform: true,
    }),
  );
  await app.listen(8080);
}
bootstrap();
