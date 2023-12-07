import { Module } from '@nestjs/common';
import { SentencesService } from './sentences.service';
import { SentencesController } from './sentences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sentence } from './entities/sentence.entity';
import { Guide } from 'src/guides/entities/guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sentence, Guide])],
  controllers: [SentencesController],
  providers: [SentencesService],
})
export class SentencesModule {}
