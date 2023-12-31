import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslationsModule } from './translations/translations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translation } from './translations/entities/translation.entity';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { GuidesModule } from './guides/guides.module';
import { Guide } from './guides/entities/guide.entity';
import { SentencesModule } from './sentences/sentences.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TranslationsModule,
    GuidesModule,
    SentencesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'YourDatabasePassword',
      database: process.env.DB_DATABASE || 'translations',
      entities: [Translation, Guide],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
