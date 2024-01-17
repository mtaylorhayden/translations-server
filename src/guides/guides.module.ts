import { Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { Translation } from 'src/translations/entities/translation.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide, Translation, Sentence, Workbook])],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
