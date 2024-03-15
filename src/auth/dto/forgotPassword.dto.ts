import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  isNotEmpty,
} from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(6, 50, { message: 'Password must be between 6 and 50 characters.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
