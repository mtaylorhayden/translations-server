import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Repository } from 'typeorm';
import { GetTranslationDto } from './dto/get-translation.dto';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { Guide } from 'src/guides/entities/guide.entity';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
  ) {}

  async addTranslationToGuide(
    createTranslationDto: CreateTranslationDto,
    guideId: number,
  ): Promise<CreateTranslationDto> {
    try {
      const translation =
        await this.translationRepository.save(createTranslationDto);

      const guide = await this.guideRepository.findOne({
        where: { id: guideId },
        relations: ['translations'],
      });

      if (guide) {
        guide.translations.push(translation);
        await this.guideRepository.save(guide);
        return translation;
      } else {
        throw new NotFoundException(`Guide with id ${guideId} not found`);
      }
    } catch (error) {
      throw new HttpException(
        'Error saving translation to the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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
