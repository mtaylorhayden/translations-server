import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { JwtValidation } from './middleware/jwtValidation';
import { Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Res() response: Response) {
    const { access_token, role } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    response.cookie('jwt', access_token, {
      httpOnly: true,
      domain: '.localhost',
      path: '/',
      secure: false,
    });
    response.send({ message: 'Authenciation Successful', role });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const { access_token, role } = await this.authService.register(registerDto);
    response.cookie('jwt', access_token, {
      httpOnly: true,
      secure: false,
    });
    response.send({ message: 'User creation Successful', role });
  }

  @Get('/refreshToken')
  @UseGuards(JwtValidation)
  async refreshToken(@Request() req) {
    const user: User = req.user; // extract user from token
    const newPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const newAccessToken = await this.jwtService.signAsync(newPayload, {
      secret: process.env.SECRET,
    });
    return { access_token: newAccessToken };
  }
}
