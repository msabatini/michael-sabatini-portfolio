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
    const settings = await this.settingsRepository.findOneBy({
      key: 'settings',
    });
    if (!settings) {
      const defaultSettings = this.settingsRepository.create({
        key: 'settings',
        siteTitle: 'Michael Sabatini | Portfolio',
        heroTitle: 'Front End Engineer & Designer',
        heroSubtitle:
          'Designing & building high-performance, accessible, and beautiful web experiences.',
        bioLead:
          'A passionate Senior Graphic Designer with 15+ years of experience and a Senior Frontend Engineer with over 10 years of experience, designing & building modern web applications.',
        bioFull:
          "I specialize in building scalable, high-performance applications using Angular and NestJS. My focus is on creating intuitive user experiences that are both beautiful and accessible.\n\nWhen I'm not building, creating or envisioning, you can find me exploring new technologies, thinking about how we can make this world a better place, or enjoying a good cup of coffee after a long bike ride.",
        frontendSkills: ['Angular', 'TypeScript', 'SCSS / Tailwind', 'RxJS'],
        backendSkills: [
          'NestJS',
          'Node.js',
          'PostgreSQL / SQLite',
          'RESTful APIs',
        ],
        toolSkills: ['Git / GitHub', 'Docker', 'CI/CD Pipelines', 'VS Code'],
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        email: 'michael@example.com',
      });
      await this.settingsRepository.save(defaultSettings);
    } else {
      // Force update the bioLead and skills to the new version
      const targetBioLead = 'Senior Graphic Designer with 15+ years of experience in brand strategy, visual storytelling, and high-impact creative execution, supported by 10+ years of front-end development experience. Proven track record of contributing to over $5M in revenue through strategic proposal design, brand initiatives, and results-driven marketing campaigns. Specialized in UI/UX design, brand systems, marketing collateral, and print production, with advanced proficiency in Adobe Creative Suite. Experienced in designing and building responsive websites using HTML, CSS, and JavaScript, bridging design vision with technical implementation. Delivers cohesive, user-focused creative solutions that strengthen brand identity, enhance engagement, and drive measurable business results.';
      
      settings.bioLead = targetBioLead;
      settings.frontendSkills = ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass', 'Responsive design', 'Bootstrap', 'Component libraries', 'UI frameworks', 'Mobile-first engineering', 'Google Maps', 'Google Charts', 'Cross-browser compatibility', 'Accessibility', 'Code quality', 'Unit testing'];
      settings.backendSkills = ['Node.js', 'NestJS', 'MongoDB', 'PostgreSQL', 'RESTful APIs'];
      settings.toolSkills = ['Agile Methodology', 'Version Control Systems', 'Jira', 'GitHub', 'Bitbucket', 'VS Code', 'AI Pair Programmers'];
      
      await this.settingsRepository.save(settings);
    }
  }

  async getSettings(): Promise<AppSettings> {
    const settings = await this.settingsRepository.findOneBy({
      key: 'settings',
    });
    return settings!;
  }

  async updateSettings(data: Partial<AppSettings>): Promise<AppSettings> {
    const settings = await this.getSettings();
    Object.assign(settings, data);
    return this.settingsRepository.save(settings);
  }
}
