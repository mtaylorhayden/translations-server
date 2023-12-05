import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetGuideDto } from './dto/get-guide.dto';

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

  async findAll(): Promise<GetGuideDto[]> {
    try {
      const guides = await this.guideRepository.find();

      if (guides.length) {
        return guides.map((guide) => ({
          id: guide.id,
          title: guide.title,
          description: guide.description,
          examples: guide.examples,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error finding guides in the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
