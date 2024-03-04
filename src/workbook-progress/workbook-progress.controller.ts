import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkbookProgressService } from './workbook-progress.service';
import { CreateWorkbookProgressDto } from './dto/create-workbook-progress.dto';
import { UpdateWorkbookProgressDto } from './dto/update-workbook-progress.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('workbook-progress')
export class WorkbookProgressController {
  constructor(
    private readonly workbookProgressService: WorkbookProgressService,
  ) {}

  @Post()
  create(@Body() createWorkbookProgressDto: CreateWorkbookProgressDto) {
    return this.workbookProgressService.create(createWorkbookProgressDto);
  }

  @Get()
  findAll() {
    return this.workbookProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workbookProgressService.findOne(+id);
  }

  // when a user completes a workbook we need to update its status
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkbookProgressDto: UpdateWorkbookProgressDto,
  ) {
    return this.workbookProgressService.update(+id, updateWorkbookProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workbookProgressService.remove(+id);
  }
}
