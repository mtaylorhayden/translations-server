import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userServices.findOne(username);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
      role: user.role,
    };
  }

  async register(registerDto: RegisterDto) {
    const userExists = await this.userServices.emailExists(registerDto.email);
    if (userExists) {
      throw new BadRequestException('Email is already registered');
    }
    const hashedPassword = await this.hashPassword(registerDto.password);
    const createdUser = await this.userServices.create({
      ...registerDto,
      password: hashedPassword,
    });
    // generate token to auto sign-in user
    const payload = {
      sub: createdUser.id,
      username: createdUser.username,
      role: createdUser.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
      role: createdUser.role,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async sendPasswordReset(email: string) {
    this.mailerService
      .sendMail({
        to: email,
        from: 'noreply@nest.com',
        subject: 'Testing',
        text: 'welcome to our site',
        html: '<p>Seni seviyorum <3</p>',
      })
      .then(() => {})
      .catch((e) => {
        console.log('error in email ', e);
      });
  }

  async refreshToken(user: any) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
    };
  }
}
