import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SentencesService } from './sentences.service';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';
import { Sentence } from './entities/sentence.entity';

@Controller('sentences')
export class SentencesController {
  constructor(private readonly sentencesService: SentencesService) {}

  @Post('/guide/:id')
  addToGuide(
    @Body() createSentenceDto: CreateSentenceDto,
    @Param('id') id: string,
  ) {
    return this.sentencesService.addToGuide(createSentenceDto, +id);
  }

  @Get()
  findAll(): Promise<Sentence[]> {
    return this.sentencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentencesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSentenceDto: UpdateSentenceDto,
  ): Promise<Sentence> {
    return this.sentencesService.update(+id, updateSentenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.sentencesService.remove(+id);
  }

  // not implemented
  @Post()
  create(@Body() createSentenceDto: CreateSentenceDto): string {
    return 'not implemented, use /sentences/guide/:id';
    // return this.sentencesService.create(createSentenceDto);
  }
}
