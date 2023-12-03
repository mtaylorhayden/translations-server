import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslationsModule } from './translations/translations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translation } from './translations/entities/translation.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TranslationsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Maxownsu2!',
      database: 'translations',
      entities: [Translation],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {} // not sure about this line
}
