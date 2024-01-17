import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlankExercisesService } from './blank-exercises.service';
import { CreateBlankExerciseDto } from './dto/create-blank-exercise.dto';
import { UpdateBlankExerciseDto } from './dto/update-blank-exercise.dto';
import { BlankExercise } from './entities/blank-exercise.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('blank-exercises')
export class BlankExercisesController {
  constructor(private readonly blankExercisesService: BlankExercisesService) {}

  // add blank exercise to workbook
  @Public()
  @Post('/workbook/:workbookId')
  create(
    @Body() createBlankExerciseDto: CreateBlankExerciseDto,
    @Param('workbookId') workbookId: string,
  ): Promise<BlankExercise> {
    return this.blankExercisesService.create(
      createBlankExerciseDto,
      +workbookId,
    );
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
  update(
    @Param('id') id: string,
    @Body() updateBlankExerciseDto: UpdateBlankExerciseDto,
  ) {
    return this.blankExercisesService.update(+id, updateBlankExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blankExercisesService.remove(+id);
  }
}
