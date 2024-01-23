import { IsString } from 'class-validator';

export class CreateUserProgressDto {
  @IsString()
  userId: string;
}
