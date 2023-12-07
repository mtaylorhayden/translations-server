import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Guide } from 'src/guides/entities/guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Translation, Guide])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule {}
