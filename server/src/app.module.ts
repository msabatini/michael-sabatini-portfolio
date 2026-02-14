import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';
import { Analytics } from './analytics/analytics.entity';
import { DashboardNote } from './analytics/dashboard-note.entity';
import { DashboardShare } from './analytics/dashboard-share.entity';
import { ApiKey } from './analytics/api-key.entity';
import { Message } from './contact/message.entity';
import { AppSettings } from './app-settings.entity';
import { User } from './auth/user.entity';
import { Media } from './media/media.entity';
import { MailModule } from './mail/mail.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/assets',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'sqlite',
        database: process.env.DATABASE_PATH || 'database.sqlite',
        entities: [
          Project,
          Analytics,
          DashboardNote,
          DashboardShare,
          ApiKey,
          Message,
          AppSettings,
          User,
          Media,
        ],
        synchronize: true, // Set to false in a real production app with migrations
      }),
    }),
    ProjectsModule,
    MailModule,
    AnalyticsModule,
    ContactModule,
    AuthModule,
    MediaModule,
    TypeOrmModule.forFeature([AppSettings]),
  ],
  controllers: [AppController, SettingsController],
  providers: [AppService, SettingsService],
})
export class AppModule {}
