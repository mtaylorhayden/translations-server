import { Injectable } from '@nestjs/common';
import { CreateWorkbookDto } from './dto/create-workbook.dto';
import { UpdateWorkbookDto } from './dto/update-workbook.dto';

@Injectable()
export class WorkbooksService {
  create(createWorkbookDto: CreateWorkbookDto) {
    return 'This action adds a new workbook';
  }

  findAll() {
    return `This action returns all workbooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workbook`;
  }

  update(id: number, updateWorkbookDto: UpdateWorkbookDto) {
    return `This action updates a #${id} workbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} workbook`;
  }
}
