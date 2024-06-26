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
import { WorkbooksModule } from './workbooks/workbooks.module';
import { BlankExercisesModule } from './blank-exercises/blank-exercises.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { WorkbookProgressModule } from './workbook-progress/workbook-progress.module';
import { BlankExerciseProgressModule } from './blank-exercise-progress/blank-exercise-progress.module';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TranslationsModule,
    GuidesModule,
    SentencesModule,
    UserModule,
    AuthModule,
    WorkbooksModule,
    BlankExercisesModule,
    UserProgressModule,
    WorkbookProgressModule,
    BlankExerciseProgressModule,
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
    MailerModule.forRoot({
      transport: `smtps://${process.env.GMAIL_USER}:${process.env.GMAIL_PASSWORD}@smtp.gmail.com`,
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates', // we need to make this file and use pug as a template
        // adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
