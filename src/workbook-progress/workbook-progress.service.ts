import { Injectable } from '@nestjs/common';
import { CreateWorkbookProgressDto } from './dto/create-workbook-progress.dto';
import { UpdateWorkbookProgressDto } from './dto/update-workbook-progress.dto';

@Injectable()
export class WorkbookProgressService {
  create(createWorkbookProgressDto: CreateWorkbookProgressDto) {
    return 'This action adds a new workbookProgress';
  }

  findAll() {
    return `This action returns all workbookProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workbookProgress`;
  }

  update(id: number, updateWorkbookProgressDto: UpdateWorkbookProgressDto) {
    return `This action updates a #${id} workbookProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} workbookProgress`;
  }
}
