import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService, SeedService],
  controllers: [ProjectsController],
  exports: [TypeOrmModule, ProjectsService],
})
export class ProjectsModule {}
