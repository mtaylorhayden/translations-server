import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Public()
  @Post('/workbookId/:workbookId/blankExerciseId/:blankExerciseId')
  create(
    @Body() createUserProgressDto: CreateUserProgressDto,
    @Param('workbookId') workbookId: string, // to create the workbook progress
    @Param('blankExerciseId') blankExerciseId: string, // to create exercise progress
  ) {
    let userProgress = this.userProgressService.create(
      createUserProgressDto,
      +workbookId,
      +blankExerciseId,
    );
    return userProgress;
  }

  @Get()
  findAll() {
    return this.userProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserProgressDto: UpdateUserProgressDto,
  ) {
    return this.userProgressService.update(+id, updateUserProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProgressService.remove(+id);
  }
}
