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
        heroTitle: 'Graphic Designer & Frontend Engineer',
        heroSubtitle:
          'Designing & building high-impact brand experiences and modern web applications.',
        bioLead:
          'A passionate Senior Graphic Designer with 15+ years of experience and a Senior Frontend Engineer with over 10 years of experience, designing & building modern web applications.',
        bioFull:
          "I specialize in building scalable, high-performance applications using Angular and NestJS. My focus is on creating intuitive user experiences that are both beautiful and accessible.\n\nWhen I'm not building, creating or envisioning, you can find me exploring new technologies, thinking about how we can make this world a better place, or enjoying a good cup of coffee after a long bike ride.",
        frontendSkills: [
          'Graphic Design',
          'Adobe Creative Cloud',
          'Figma',
          'Digital Design',
          'Responsive design',
          'Communication',
          'Problem Solving',
          'Design Principles',
          'Content Moderation',
          'Visual Communication',
          'UX collaboration',
          'Design systems',
          'Leadership',
          'Analytical Skills',
          'Remote Work Skills',
        ],
        backendSkills: [
          'JavaScript (ES6+)',
          'HTML',
          'CSS',
          'Sass',
          'Agile Methodology',
          'Bootstrap Utility Classes',
          'Component libraries',
          'Mobile-first engineering',
          'Cross-browser compatibility',
        ],
        toolSkills: [
          'Jira',
          'GitHub',
          'Bitbucket',
          'VS Code',
          'AI Pair Programmers',
          'Version Control Systems',
        ],
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        email: 'michael@example.com',
      });
      await this.settingsRepository.save(defaultSettings);
    } else {
      // Force update the bioLead and skills to the new version
      const targetBioLead =
        'Senior Graphic Designer with 15+ years of experience in brand strategy, visual storytelling, and high-impact creative execution, supported by 10+ years of front-end development experience. Proven track record of contributing to over $5M in revenue through strategic proposal design, brand initiatives, and results-driven marketing campaigns. Specialized in UI/UX design, brand systems, marketing collateral, and print production, with advanced proficiency in Adobe Creative Suite. Experienced in designing and building responsive websites using HTML, CSS, and JavaScript, bridging design vision with technical implementation. Delivers cohesive, user-focused creative solutions that strengthen brand identity, enhance engagement, and drive measurable business results.';

      settings.bioLead = targetBioLead;
      settings.frontendSkills = [
        'Graphic Design',
        'Adobe Creative Cloud',
        'Figma',
        'Digital Design',
        'Responsive design',
        'Communication',
        'Problem Solving',
        'Design Principles',
        'Content Moderation',
        'Visual Communication',
        'UX collaboration',
        'Design systems',
        'Leadership',
        'Analytical Skills',
        'Remote Work Skills',
      ];
      settings.backendSkills = [
        'JavaScript (ES6+)',
        'HTML',
        'CSS',
        'Sass',
        'Agile Methodology',
        'Bootstrap Utility Classes',
        'Component libraries',
        'Mobile-first engineering',
        'Cross-browser compatibility',
      ];
      settings.toolSkills = [
        'Jira',
        'GitHub',
        'Bitbucket',
        'VS Code',
        'AI Pair Programmers',
        'Version Control Systems',
      ];

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
