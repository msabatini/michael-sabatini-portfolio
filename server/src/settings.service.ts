import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSettings } from './app-settings.entity';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(AppSettings)
    private settingsRepository: Repository<AppSettings>,
  ) {}

  async onModuleInit() {
    const settings = await this.settingsRepository.findOneBy({ key: 'settings' });
    if (!settings) {
      const defaultSettings = this.settingsRepository.create({
        key: 'settings',
        siteTitle: 'Michael Sabatini | Portfolio',
        heroTitle: 'Front End Engineer & Designer',
        heroSubtitle: 'Designing & building high-performance, accessible, and beautiful web experiences.',
        bioLead: 'A passionate Front End Engineer with over 10 years of experience building modern web applications.',
        bioFull: 'I specialize in building scalable, high-performance applications using Angular and NestJS. My focus is on creating intuitive user experiences that are both beautiful and accessible.\n\nWhen I\'m not building, creating or envisioning, you can find me exploring new technologies, thinking about how we can make this world a better place, or enjoying a good cup of coffee after a long bike ride.',
        frontendSkills: ['Angular', 'TypeScript', 'SCSS / Tailwind', 'RxJS'],
        backendSkills: ['NestJS', 'Node.js', 'PostgreSQL / SQLite', 'RESTful APIs'],
        toolSkills: ['Git / GitHub', 'Docker', 'CI/CD Pipelines', 'VS Code'],
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        email: 'michael@example.com'
      });
      await this.settingsRepository.save(defaultSettings);
    }
  }

  async getSettings(): Promise<AppSettings> {
    const settings = await this.settingsRepository.findOneBy({ key: 'settings' });
    return settings!;
  }

  async updateSettings(data: Partial<AppSettings>): Promise<AppSettings> {
    const settings = await this.getSettings();
    Object.assign(settings, data);
    return this.settingsRepository.save(settings);
  }
}
