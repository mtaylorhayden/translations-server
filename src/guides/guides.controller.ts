import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { GetGuideDto } from './dto/get-guide.dto';
import { CreateFullGuideDto } from './dto/create-full-guide.dto';
import { UpdateResult } from 'typeorm';
import { Guide } from './entities/guide.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(RolesGuard)
@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  create(
    @Body() createFullGuideDto: CreateFullGuideDto,
  ): Promise<CreateFullGuideDto> {
    return this.guidesService.create(createFullGuideDto);
  }

  // for existing translations and sentences
  @Post('/translation/:translationId/sentence/:sentenceId')
  createGuide(
    @Param('translationId') translationId: string,
    @Param('sentenceId') sentenceId: string,
    @Body() dto: CreateGuideDto,
  ) {
    return this.guidesService.createGuideWithTranslation(
      dto,
      +translationId,
      +sentenceId,
    );
  }

  @Get()
  findAll(): Promise<GetGuideDto[]> {
    return this.guidesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetGuideDto> {
    return this.guidesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuideDto: UpdateGuideDto,
  ): Promise<UpdateGuideDto> {
    return this.guidesService.update(+id, updateGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.guidesService.remove(+id);
  }
}
