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
        siteTitle: 'Michael Sabatini | Senior Graphic Designer',
        heroTitle: 'Senior Graphic Designer',
        heroSubtitle: 'Designing structured brand systems and digital platforms.',
        bioLead: '',
        bioFull:
          'I design structured brand systems and digital platforms that balance clarity, performance, and scalability. My work spans identity, interface design, and complex workflow environments — translating strategy into cohesive visual systems. \n\n Outside of design, I’m drawn to emerging technologies, environmental impact initiatives, and endurance cycling in the mountains.',
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
      // Force update the settings to the new version
      settings.siteTitle = 'Michael Sabatini | Senior Graphic Designer';
      settings.heroTitle = 'Senior Graphic Designer';
      settings.heroSubtitle =
        'Designing structured brand systems and digital platforms.';
      settings.bioLead = '';
      settings.bioFull =
        'I design structured brand systems and digital platforms that balance clarity, performance, and scalability. My work spans identity, interface design, and complex workflow environments — translating strategy into cohesive visual systems. \n\n Outside of design, I’m drawn to emerging technologies, environmental impact initiatives, and endurance cycling in the mountains.';

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
