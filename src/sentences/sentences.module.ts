import { Module } from '@nestjs/common';
import { SentencesService } from './sentences.service';
import { SentencesController } from './sentences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sentence } from './entities/sentence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sentence])],
  controllers: [SentencesController],
  providers: [SentencesService],
})
export class SentencesModule {}
