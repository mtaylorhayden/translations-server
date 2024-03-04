import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(registerDto: RegisterDto) {
    return await this.userRepository.save(registerDto);
  }

  async emailExists(userEmail: string): Promise<boolean> {
    try {
      const user = await this.userRepository.find({
        where: { email: userEmail },
      });
      return user.length > 0; // returns true if user exists, false otherwise
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occured while checking the email',
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
