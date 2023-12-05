import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Repository } from 'typeorm';
import { GetTranslationDto } from './dto/get-translation.dto';
import { CreateTranslationDto } from './dto/create-translation.dto';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
  ) {}

  async create(
    createTranslationDto: CreateTranslationDto,
  ): Promise<CreateTranslationDto> {
    try {
      return await this.translationRepository.save(createTranslationDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error saving translation to the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<GetTranslationDto[]> {
    try {
      const translations = await this.translationRepository.find();

      return translations.map((translation) => ({
        id: translation.id,
        englishWord: translation.englishWord,
        turkishInfinitive: translation.turkishInfinitive,
        turkishConjugated: translation.turkishConjugated,
      }));
    } catch (error) {
      throw new HttpException(
        'Error finding translations in the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} translation`;
  }

  update(id: number, updateTranslationDto: UpdateTranslationDto) {
    return `This action updates a #${id} translation`;
  }

  remove(id: number) {
    return `This action removes a #${id} translation`;
  }
}
