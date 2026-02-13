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

  async findAll(): Promise<Project[]> {
    console.log('Fetching all projects');
    const projects = await this.projectsRepository.find({
      order: {
        order: 'ASC',
        createdAt: 'DESC',
      },
    });
    console.log(`Found ${projects.length} total projects`);
    return projects;
  }

  async findByType(type: string): Promise<Project[]> {
    console.log(`Searching for projects with type: "${type}"`);
    const projects = await this.projectsRepository.find({
      where: { type },
      order: {
        order: 'ASC',
        createdAt: 'DESC',
      },
    });
    console.log(`Found ${projects.length} projects for type: "${type}"`);
    return projects;
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

  async clearAll(): Promise<void> {
    console.log('Clearing database...');
    // Use raw query for SQLite to ensure complete wipe
    await this.projectsRepository.query('DELETE FROM project');
    // Reset auto-increment for SQLite
    try {
      await this.projectsRepository.query('DELETE FROM sqlite_sequence WHERE name="project"');
    } catch (e) {
      console.log('sqlite_sequence table not found, skipping reset');
    }
  }
}
