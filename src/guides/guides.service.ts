import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetGuideDto } from './dto/get-guide.dto';
import { Translation } from 'src/translations/entities/translation.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { CreateFullGuideDto } from './dto/create-full-guide.dto';

@Injectable()
export class GuidesService {
  constructor(
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    @InjectRepository(Sentence)
    private sentenceRepository: Repository<Sentence>,
  ) {}

  async createGuideWithTranslation(
    dto: CreateGuideDto,
    translationId: number,
    sentenceId: number,
  ) {
    const translation: Translation = await this.translationRepository.findOne({
      where: {
        id: translationId,
      },
    });

    const sentence: Sentence = await this.sentenceRepository.findOne({
      where: {
        id: sentenceId,
      },
    });

    // if we found a translation then create a guide
    if (translation && sentence) {
      let guide: Guide = new Guide();
      guide.translations = [translation];
      guide.sentences = [sentence];
      guide.title = dto.title;
      guide.description = dto.description;
      guide.examples = dto.examples;
      if (dto.subDescription) {
        guide.subDescription = dto.subDescription;
      }
      try {
        return await this.guideRepository.save(guide);
      } catch (error) {
        throw new HttpException(
          'Error saving guide to the database',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        'Error finding translation for guide from the database',
        HttpStatus.NOT_FOUND,
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
          subDescription: guide?.subDescription,
          examples: guide.examples,
          sentences: guide.sentences,
          translations: guide.translations,
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

  async findOne(id: number): Promise<GetGuideDto> {
    const guide = await this.guideRepository.findOne({
      where: {
        id: id,
      },
      relations: ['sentences', 'translations'],
    });

    if (guide) {
      return {
        id,
        title: guide.title,
        description: guide.description,
        subDescription: guide?.subDescription,
        examples: guide.examples,
        sentences: guide.sentences,
        translations: guide.translations,
      };
    }

    throw new HttpException(
      `Could not find guide with id: ${id}`,
      HttpStatus.NOT_FOUND,
    );
  }

  // do we need to save each sentence and translation separately?
  async create(
    createFullGuideDto: CreateFullGuideDto,
  ): Promise<CreateFullGuideDto> {
    try {
      await this.translationRepository.save(createFullGuideDto.translations);
      await this.sentenceRepository.save(createFullGuideDto.sentences);
      return await this.guideRepository.save(createFullGuideDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error creating guide ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updateGuideDto: UpdateGuideDto): Promise<Guide> {
    try {
      // Find the guide by id
      const guide = await this.guideRepository.findOne({
        where: { id: id },
        relations: ['translations', 'sentences'],
      });
      if (!guide) {
        throw new HttpException(
          `Could not find guide with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      // Delete the existing sentences
      if (updateGuideDto?.sentences?.length > 0) {
        await this.sentenceRepository.delete({ guide: { id: id } });
      }
      // Delete the existing translations
      if (updateGuideDto?.translations?.length > 0) {
        await this.translationRepository.delete({ guide: { id: id } });
      }

      Object.assign(guide, updateGuideDto);

      return await this.guideRepository.save(guide);
    } catch (error) {
      throw new HttpException(
        `Could not update guide with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<string> {
    const guide = await this.guideRepository.findOne({
      where: { id },
      relations: ['translations', 'sentences'],
    });
    if (!guide) {
      throw new HttpException(
        `Could not find guide with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.guideRepository.remove(guide);
    return `Successfully removed guide ${id}`;
  }
}
