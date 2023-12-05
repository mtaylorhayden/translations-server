import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
  ) {}

  create(createGuideDto: CreateGuideDto) {
    const guide = this.guideRepository.create(createGuideDto);

    try {
      return this.guideRepository.save(guide);
    } catch (error) {
      throw new HttpException(
        'Error saving guide to the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all guides`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guide`;
  }

  update(id: number, updateGuideDto: UpdateGuideDto) {
    return `This action updates a #${id} guide`;
  }

  remove(id: number) {
    return `This action removes a #${id} guide`;
  }
}
