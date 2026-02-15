import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { SeedService } from './seed.service';
import { AppSettings } from '../app-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, AppSettings])],
  providers: [ProjectsService, SeedService],
  controllers: [ProjectsController],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
