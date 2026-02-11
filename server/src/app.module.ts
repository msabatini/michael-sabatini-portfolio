import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';
import { Analytics } from './analytics/analytics.entity';
import { Message } from './contact/message.entity';
import { AppSettings } from './app-settings.entity';
import { MailModule } from './mail/mail.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ContactModule } from './contact/contact.module';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: process.env.DATABASE_PATH || 'database.sqlite',
        entities: [Project, Analytics, Message, AppSettings],
        synchronize: true, // Set to false in a real production app with migrations
      }),
    }),
    ProjectsModule,
    MailModule,
    AnalyticsModule,
    ContactModule,
    TypeOrmModule.forFeature([AppSettings]),
  ],
  controllers: [AppController, SettingsController],
  providers: [AppService, SettingsService],
})
export class AppModule {}
