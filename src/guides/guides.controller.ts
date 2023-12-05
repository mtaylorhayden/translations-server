import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuidesService } from './guides.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { GetGuideDto } from './dto/get-guide.dto';

@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}

  @Post()
  create(@Body() createGuideDto: CreateGuideDto) {
    console.log(createGuideDto);

    return this.guidesService.create(createGuideDto);
  }

  @Get()
  findAll(): Promise<GetGuideDto[]> {
    return this.guidesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guidesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuideDto: UpdateGuideDto) {
    return this.guidesService.update(+id, updateGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidesService.remove(+id);
  }
}
