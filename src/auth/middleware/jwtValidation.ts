import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// this middleware is to validate the incoming token
@Injectable()
export class JwtValidation implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });
      req['user'] = payload;
      next();
    } catch (error) {
      // if we hit this redirect user to sign in page 401
      next(new UnauthorizedException(`Invalid token, ${error.message}`));
    }
  }
}
