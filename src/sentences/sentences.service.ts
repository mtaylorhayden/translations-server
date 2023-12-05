import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sentence } from './entities/sentence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SentencesService {
  constructor(
    @InjectRepository(Sentence)
    private sentenceRepository: Repository<Sentence>,
  ) {}

  create(createSentenceDto: CreateSentenceDto): Promise<Sentence> {
    try {
      return this.sentenceRepository.save(createSentenceDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error saving sentence to the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(): Promise<Sentence[]> {
    try {
      return this.sentenceRepository.find();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error finding sentences from the database',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sentence`;
  }

  update(id: number, updateSentenceDto: UpdateSentenceDto) {
    return `This action updates a #${id} sentence`;
  }

  remove(id: number) {
    return `This action removes a #${id} sentence`;
  }
}
