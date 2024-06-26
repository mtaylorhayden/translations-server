import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './entities/guide.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetGuideDto } from './dto/get-guide.dto';
import { Translation } from 'src/translations/entities/translation.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { CreateFullGuideDto } from './dto/create-full-guide.dto';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';

@Injectable()
export class GuidesService {
  constructor(
    private entityManager: EntityManager,
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
          level: guide.level,
          title: guide.title,
          description: guide.description,
          subDescription: guide?.subDescription,
          examples: guide.examples,
          sentences: guide.sentences,
          translations: guide.translations,
          workbooks: guide.workbooks,
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
    const guide = await this.findGuide(id);

    if (guide) {
      return {
        id,
        title: guide.title,
        level: guide.level,
        description: guide.description,
        subDescription: guide?.subDescription,
        examples: guide.examples,
        sentences: guide.sentences,
        translations: guide.translations,
        workbooks: guide.workbooks,
      };
    }
  }

  async create(
    createFullGuideDto: CreateFullGuideDto,
  ): Promise<CreateFullGuideDto> {
    try {
      let guide = new Guide();
      Object.assign(guide, createFullGuideDto);

      return await this.guideRepository.save(guide);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error creating guide ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateGuideDto: UpdateGuideDto,
  ): Promise<UpdateGuideDto> {
    try {
      return await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          // find the guide
          const guide = await this.findGuide(id);

          // Delete the existing sentences
          if (updateGuideDto?.sentences?.length > 0) {
            await transactionalEntityManager.delete(Sentence, {
              guide: { id: id },
            });
          }
          // Delete the existing translations
          if (updateGuideDto?.translations?.length > 0) {
            await transactionalEntityManager.delete(Translation, {
              guide: { id: id },
            });
          }
          Object.assign(guide, updateGuideDto);
          await transactionalEntityManager.save(guide);
          return updateGuideDto;
        },
      );
    } catch (error) {
      // if (error inst)
      throw new HttpException(
        `Could not update guide with id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const guide = await this.findGuide(id);
      try {
        await this.guideRepository.remove(guide);
        return `Successfully removed guide ${id}`;
      } catch (deletionError) {
        throw new HttpException(
          `Could not delete guide with id: ${id}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async findGuide(id: number): Promise<Guide> {
    if (!Number.isSafeInteger(id)) {
      throw new HttpException(
        'The ID is out of acceptable range',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const guide = await this.guideRepository.findOne({
        where: { id },
        relations: ['translations', 'sentences', 'workbooks'],
      });

      if (!guide) {
        throw new HttpException(
          `Could not find guide with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return guide;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        // Rethrow the not found error if it is already set
        throw error;
      }
      // Handling generic database errors
      throw new HttpException(
        'A database error occurred while retrieving the guide',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
