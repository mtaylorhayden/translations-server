import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlankExerciseProgressService } from './blank-exercise-progress.service';
import { CreateBlankExerciseProgressDto } from './dto/create-blank-exercise-progress.dto';
import { UpdateBlankExerciseProgressDto } from './dto/update-blank-exercise-progress.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('blank-exercise-progress')
export class BlankExerciseProgressController {
  constructor(
    private readonly blankExerciseProgressService: BlankExerciseProgressService,
  ) {}

  @Post()
  create(
    @Body() createBlankExerciseProgressDto: CreateBlankExerciseProgressDto,
  ) {
    return this.blankExerciseProgressService.create(
      createBlankExerciseProgressDto,
    );
  }

  @Get()
  findAll() {
    return this.blankExerciseProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blankExerciseProgressService.findOne(+id);
  }

  // used to update the specific exercise the user has completed or skipped
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlankExerciseProgressDto: UpdateBlankExerciseProgressDto,
  ) {
    return this.blankExerciseProgressService.update(
      +id,
      updateBlankExerciseProgressDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blankExerciseProgressService.remove(+id);
  }
}
