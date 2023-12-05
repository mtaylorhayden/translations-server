import { Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide])],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
