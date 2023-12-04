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

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  create(@Body() { translations }: CreateTranslationDto) {
    console.log('Received DTO:', translations);
    this.translationsService.create(translations);
    return 'Translation created successfully';
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
  ) {
    return this.translationsService.update(+id, updateTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationsService.remove(+id);
  }
}
