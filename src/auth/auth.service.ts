import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import { Token } from './entities/token.entity';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  // todo use email not username
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
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
    const user = await this.userService.findOneByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('Email is already registered');
    }
    const hashedPassword = await this.hashPassword(registerDto.password);
    const createdUser = await this.userService.create({
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

  async sendResetPasswordEmail(email: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      const tokenEntity = await this.createTokenEntity(user);

      await this.mailerService.sendMail({
        to: email,
        from: 'noreply@nest.com',
        subject: 'Reset Password',
        html: `<p>Click the link to reset your password ${process.env.CLIENT_URL}/?tokenId=${tokenEntity.token}&userId=${user.id}</p>`,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occured when sending the email in sendResetPasswordEmail, auth.service.ts',
      );
    }
  }

  async resetPassword(password: string, token: string) {
    try {
      const tokenEntity = await this.checkToken(token);
      if (!tokenEntity) {
        throw new UnauthorizedException();
      }
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.findOneByEmail(
        tokenEntity.user.email,
      );
      this.userService.updatePassword(user, hashedPassword);

      // return valid jwt token
    } catch (error) {
      console.error('An error has occured when resetting the password ', error);
    }
  }

  generateToken(): string {
    const rawToken = crypto.randomBytes(32).toString('base64');
    // Replace '+' with '-', '/' with '_', and remove '=' padding characters for URL safety
    return rawToken.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  async createTokenEntity(user: User): Promise<Token> {
    const tokenEntity = new Token();
    tokenEntity.user = user;
    tokenEntity.expiresAt = new Date(new Date().getTime() + 5 * 60000);
    tokenEntity.isUsed = false;
    tokenEntity.token = this.generateToken();
    return this.tokenRepository.save(tokenEntity);
  }

  async refreshToken(user: any) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET,
      }),
    };
  }

  async checkToken(token: string): Promise<Token> {
    const tokenEntity = await this.tokenRepository.findOne({
      where: { token },
    });
    if (tokenEntity.isUsed === false && new Date() < tokenEntity.expiresAt) {
      return tokenEntity;
    }
    return null;
  }
}
