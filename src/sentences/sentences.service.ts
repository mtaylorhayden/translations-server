import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sentence } from './entities/sentence.entity';
import { Repository } from 'typeorm';
import { Guide } from 'src/guides/entities/guide.entity';

@Injectable()
export class SentencesService {
  constructor(
    @InjectRepository(Sentence)
    private sentenceRepository: Repository<Sentence>,
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
  ) {}

  async addToGuide(createSentenceDto: CreateSentenceDto, guideId: number) {
    try {
      const sentence = await this.sentenceRepository.save(createSentenceDto);

      const guide = await this.guideRepository.findOne({
        where: { id: guideId },
        relations: ['sentences'],
      });

      // add the sentence to the guide
      if (guide) {
        guide.sentences.push(sentence);
        await this.guideRepository.save(guide);
        return sentence;
      } else {
        throw new NotFoundException(`Guide with id ${guideId} not found`);
      }
    } catch (error) {
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

  async update(
    id: number,
    updateSentenceDto: UpdateSentenceDto,
  ): Promise<Sentence> {
    try {
      const sentence = await this.sentenceRepository.findOne({
        where: { id: id },
      });
      if (sentence) {
        Object.assign(sentence, updateSentenceDto);
        return await this.sentenceRepository.save(sentence);
      } else {
        throw new HttpException(
          'Error finding sentence in the database',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error('Error updating sentence:', error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const sentence = await this.sentenceRepository.findOne({
        where: { id: id },
      });
      await this.sentenceRepository.remove(sentence);
      return `Successfully removed sentence ${id}`;
    } catch (error) {
      throw new HttpException(
        `Could not find sentence with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // not implemented
  // create(createSentenceDto: CreateSentenceDto): Promise<Sentence> {
  //   try {
  //     return this.sentenceRepository.save(createSentenceDto);
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException(
  //       'Error saving sentence to the database',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
}
