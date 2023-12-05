import { Injectable } from '@nestjs/common';
import { CreateSentenceDto } from './dto/create-sentence.dto';
import { UpdateSentenceDto } from './dto/update-sentence.dto';

@Injectable()
export class SentencesService {
  create(createSentenceDto: CreateSentenceDto) {
    return 'This action adds a new sentence';
  }

  findAll() {
    return `This action returns all sentences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sentence`;
  }

  update(id: number, updateSentenceDto: UpdateSentenceDto) {
    return `This action updates a #${id} sentence`;
  }

  remove(id: number) {
    return `This action removes a #${id} sentence`;
  }
}
