import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: number): Promise<Project | null> {
    return this.projectsRepository.findOneBy({ id });
  }

  create(project: Partial<Project>): Promise<Project> {
    const newProject = this.projectsRepository.create(project);
    return this.projectsRepository.save(newProject);
  }

  async update(id: number, project: Partial<Project>): Promise<Project | null> {
    const existing = await this.findOne(id);
    if (!existing) return null;
    Object.assign(existing, project);
    return this.projectsRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
