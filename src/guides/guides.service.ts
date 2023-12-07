import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import { Repository } from 'typeorm';
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

  async update(
    id: number,
    updateGuideDto: UpdateGuideDto,
  ): Promise<UpdateGuideDto> {
    try {
      const guide = await this.guideRepository.findOne({
        where: { id: id },
        relations: ['translations', 'sentences'],
      });

      if (!guide) {
        throw new HttpException('Guide not found', HttpStatus.NOT_FOUND);
      }

      // Update guide properties
      Object.assign(guide, updateGuideDto);

      const sentence = await this.sentenceRepository.findOne({
        where: { guide: { id: id } },
        relations: ['guide'],
      });
      await this.sentenceRepository.delete(sentence);

      // Update sentences
      if (updateGuideDto.sentences && updateGuideDto.sentences.length > 0) {
        if (!guide.sentences) {
          guide.sentences = [];
        }
        guide.translations.forEach((sentence, index) => {
          Object.assign(sentence, updateGuideDto.sentences[index]);
        });
      }

      // Update translations
      if (
        updateGuideDto.translations &&
        updateGuideDto.translations.length > 0
      ) {
        if (!guide.translations) {
          guide.translations = [];
        }
        guide.translations.forEach((translation, index) => {
          Object.assign(translation, updateGuideDto.translations[index]);
        });
      }

      // Save the updated guide with relationships
      const updatedGuide = await this.guideRepository.save(guide);

      return updatedGuide;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //   const sentence = await this.sentenceRepository.findOne({
    //     where: { guide: { id: id } },
    //     relations: ['guide'],
    //   });
    //   const translation = await this.translationRepository.findOne({
    //     where: { guide: { id: id } },
    //     relations: ['guide'],
    //   });
    //   if (sentence) {
    //     Object.assign(sentence, updateGuideDto.sentences[0]);
    //     sentence.guide = guide;
    //     await this.sentenceRepository.save(sentence);
    //   }
    //   if (translation) {
    //     Object.assign(translation, updateGuideDto.translations);
    //     translation.guide = guide;
    //     await this.translationRepository.save(translation);
    //   }

    //   if (guide) {
    //     Object.assign(guide, updateGuideDto);
    //     return await this.guideRepository.save(guide);
    //   }
    // } catch (error) {
    //   throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  remove(id: number) {
    return `This action removes a #${id} guide`;
  }
}
