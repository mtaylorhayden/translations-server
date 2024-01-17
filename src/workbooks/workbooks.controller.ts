import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkbooksService } from './workbooks.service';
import { CreateWorkbookDto } from './dto/create-workbook.dto';
import { UpdateWorkbookDto } from './dto/update-workbook.dto';

@Controller('workbooks')
export class WorkbooksController {
  constructor(private readonly workbooksService: WorkbooksService) {}

  @Post()
  create(@Body() createWorkbookDto: CreateWorkbookDto) {
    return this.workbooksService.create(createWorkbookDto);
  }

  @Get()
  findAll() {
    return this.workbooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workbooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkbookDto: UpdateWorkbookDto) {
    return this.workbooksService.update(+id, updateWorkbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workbooksService.remove(+id);
  }
}
