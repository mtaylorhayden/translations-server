import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { GetTranslationDto } from './dto/get-translation.dto';
import { Translation } from './entities/translation.entity';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post('/guide/:id')
  addTranslationToGuide(
    @Body() createTranslationDto: CreateTranslationDto,
    @Param('id') id: string,
  ): Promise<CreateTranslationDto> {
    return this.translationsService.addTranslationToGuide(
      createTranslationDto,
      +id,
    );
  }

  @Post()
  create(@Body() createTranslationDto: CreateTranslationDto): string {
    // console.log('Received DTO:', createTranslationDto);
    // return this.translationsService.create(createTranslationDto);
    return 'Not implemented, use /translations/guide/:id';
  }

  @Get()
  findAll(): Promise<GetTranslationDto[]> {
    return this.translationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ): Promise<Translation> {
    return this.translationsService.update(+id, updateTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationsService.remove(+id);
  }
}
