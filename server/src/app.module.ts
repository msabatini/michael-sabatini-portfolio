import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';
import { MailModule } from './mail/mail.module';
import { ContactController } from './contact/contact.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Project],
      synchronize: true,
    }),
    ProjectsModule,
    MailModule,
  ],
  controllers: [AppController, ContactController],
  providers: [AppService],
})
export class AppModule {}
