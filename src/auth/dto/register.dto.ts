import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'First name must be a string.' })
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @IsString({ message: 'Last name must be a string.' })
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;

  @IsString({ message: 'Username must be a string.' })
  @Length(4, 20, { message: 'Username must be between 4 and 20 characters.' })
  @IsNotEmpty({ message: 'Username is required.' })
  username: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(6, 50, { message: 'Password must be between 6 and 50 characters.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;
}
