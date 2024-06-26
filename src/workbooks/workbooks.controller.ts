import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { WorkbooksService } from './workbooks.service';
import { CreateWorkbookDto } from './dto/create-workbook.dto';
import { UpdateWorkbookDto } from './dto/update-workbook.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Workbook } from './entities/workbook.entity';

@Controller('workbooks')
export class WorkbooksController {
  constructor(private readonly workbooksService: WorkbooksService) {}

  @Post()
  create(@Body() createWorkbookDto: CreateWorkbookDto) {
    const result = this.workbooksService.create(createWorkbookDto);
    console.log(result);
    return result;
  }

  @Get()
  findAll(): Promise<Workbook[]> {
    return this.workbooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workbooksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkbookDto: UpdateWorkbookDto,
  ) {
    return this.workbooksService.update(+id, updateWorkbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workbooksService.remove(+id);
  }
}
