import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlankExercisesService } from './blank-exercises.service';
import { CreateBlankExerciseDto } from './dto/create-blank-exercise.dto';
import { UpdateBlankExerciseDto } from './dto/update-blank-exercise.dto';

@Controller('blank-exercises')
export class BlankExercisesController {
  constructor(private readonly blankExercisesService: BlankExercisesService) {}

  @Post()
  create(@Body() createBlankExerciseDto: CreateBlankExerciseDto) {
    return this.blankExercisesService.create(createBlankExerciseDto);
  }

  @Get()
  findAll() {
    return this.blankExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blankExercisesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlankExerciseDto: UpdateBlankExerciseDto) {
    return this.blankExercisesService.update(+id, updateBlankExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blankExercisesService.remove(+id);
  }
}
