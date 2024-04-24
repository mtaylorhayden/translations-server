import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all user`;
  }

  // todo this doesn't work because username's aren't unique
  findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updatePassword(user: User, hashedPassword: string) {
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: hashedPassword })
      .where('id = :id', { id: user.id })
      .execute();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
