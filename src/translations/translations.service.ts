import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Repository } from 'typeorm';
import { GetTranslationDto } from './dto/get-translation.dto';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
  ) {}

  create(translations: string) {
    if (!translations || !translations.trim()) {
      throw new HttpException('Input string is empty', HttpStatus.BAD_REQUEST);
    }

    const splitWords = translations.split(',').map((word) => word.trim());

    if (splitWords.length % 2 !== 0) {
      throw new HttpException(
        'Input string does not have an even number of words',
        HttpStatus.BAD_REQUEST,
      );
    }

    for (let i = 0; i < splitWords.length - 1; i += 2) {
      const turkishTranslation = splitWords[i];
      const englishTranslation = splitWords[i + 1];

      const translation = this.translationRepository.create({
        turkishTranslation,
        englishTranslation,
      });
      try {
        this.translationRepository.save(translation);
      } catch (error) {
        console.error(error);
        throw new HttpException(
          'Error saving translation to the database',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll(): Promise<GetTranslationDto[]> {
    try {
      const translations = await this.translationRepository.find();

      return translations.map((translation) => ({
        id: translation.id,
        englishTranslation: translation.englishTranslation,
        turkishTranslation: translation.turkishTranslation,
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
