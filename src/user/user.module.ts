import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User, UserProgress])],
})
export class UserModule {}
