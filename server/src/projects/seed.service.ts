import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSettings } from '../app-settings.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly projectsService: ProjectsService,
    @InjectRepository(AppSettings)
    private readonly settingsRepository: Repository<AppSettings>,
  ) {}

  async onModuleInit() {
    const SEEDER_VERSION = 'v8008';
    console.log(
      `Zencoder Trigger: Starting project seeding process [${SEEDER_VERSION}]...`,
    );
    this.logger.log(`FORCE SEED: ${SEEDER_VERSION}`);

    try {
      // Check if we already seeded this version
      /*
      const settings = await this.settingsRepository.findOneBy({
        key: 'seeder_version',
      });
      if (settings && settings.heroTitle === SEEDER_VERSION) {
        this.logger.log(
          `Seeding version ${SEEDER_VERSION} already applied. Skipping.`,
        );
        return;
      }
      */

      console.log('SEEDER: Seeding needed. Clearing database...');
      await this.projectsService.clearAll();
      console.log('SEEDER: Database cleared.');

      const initialProjects = [
        {
          title: 'Clinical Resources',
          description:
            'A healthcare education platform digitizing clinical workflows through structured design, automation, and analytics visibility.',
          imageUrl:
            '/assets/projects/clinical/clinical-resources-device-mockup-trasnparent-bg.png',
          gallery: [
            '/assets/projects/clinical/clinical-resources-device-mockup-trasnparent-bg.png',
            '/assets/projects/clinical/Landing Page/clinical-resources-desktop.jpg',
            '/assets/projects/clinical/Landing Page/clinical-resources-tablet.jpg',
            '/assets/projects/clinical/Landing Page/clinical-resources-mobile.jpg',
            '/assets/projects/clinical/Print/clinical-resources-bizcard-mockup.jpg',
            '/assets/projects/clinical/Print/clinical-resources-brochure.jpg',
          ],
          mockupUrl:
            '/assets/projects/clinical/clinical-resources-device-mockup-trasnparent-bg.png',
          content: '',
          tags: ['Health-Tech', 'Application Development', 'Analytics'],
          type: 'print-only',
          isFeatured: true,
          layout: 'grid-2',
          order: 0,
          completedDate: 'August 2025',
          colorPalette: [
            {
              hex: '#cf3178',
              rgb: '207, 49, 120',
              cmyk: '0, 76, 42, 19',
              pms: '213 C',
            },
            {
              hex: '#6dc4e1',
              rgb: '109, 196, 225',
              cmyk: '52, 13, 0, 12',
              pms: '298 C',
            },
            {
              hex: '#0c1624',
              rgb: '12, 22, 36',
              cmyk: '67, 39, 0, 86',
              pms: '2965 C',
            },
            {
              hex: '#0d223c',
              rgb: '13, 34, 60',
              cmyk: '78, 43, 0, 76',
              pms: '282 C',
            },
          ],
        },
        {
          title: 'Flourrish Environmental Funding',
          description:
            'A mission-driven funding platform uniting environmental storytelling with structured contribution and impact systems.',
          imageUrl: '/assets/projects/flourrish/flourrish-device-mockup.png',
          gallery: [
            '/assets/projects/flourrish/flourrish-device-mockup.png',
            '/assets/projects/flourrish/flourrish-case-study1.jpg',
            '/assets/projects/flourrish/flourrish-case-study2.jpg',
            '/assets/projects/flourrish/flourrish-case-study3.jpg',
            '/assets/projects/flourrish/flourrish-case-study4.jpg',
            '/assets/projects/flourrish/flourrish-case-study5.jpg',
            '/assets/projects/flourrish/flourrish-case-study6.jpg',
            '/assets/projects/flourrish/flourrish-case-study7.jpg',
            '/assets/projects/flourrish/flourrish-case-study8.jpg',
            '/assets/projects/flourrish/flourrish-case-study9.jpg',
            '/assets/projects/flourrish/flourrish-case-study10.jpg',
            '/assets/projects/flourrish/flourrish-mockup.jpg',
            '/assets/projects/flourrish/fourrish-background-image.png',
            '/assets/projects/flourrish/Landing Page/flourrish-desktop-landing-page.jpg',
            '/assets/projects/flourrish/Landing Page/flourrish-tablet-landing-page.jpg',
            '/assets/projects/flourrish/Landing Page/flourrish-mobile-landing-page.jpg',
            '/assets/projects/flourrish/Ads/1080x1080-corporate.jpg',
            '/assets/projects/flourrish/Ads/1080x1920-corporate.jpg',
            '/assets/projects/flourrish/Ads/1200x628-corporate.jpg',
            '/assets/projects/flourrish/Ads/1080x1080-individual-donor.jpg',
            '/assets/projects/flourrish/Ads/1080x1920-individual-donor.jpg',
            '/assets/projects/flourrish/Ads/1200x628-individual-donor.jpg',
            '/assets/projects/flourrish/Ads/1080x1080-Trustworthy.jpg',
            '/assets/projects/flourrish/Ads/1080x1920-Trustworthy.jpg',
            '/assets/projects/flourrish/Ads/1200x628-Trustworthy.jpg',
            '/assets/projects/flourrish/email/flourrish-email.jpg',
            '/assets/projects/flourrish/email/flourrish-email-mockup.jpg',
            '/assets/projects/flourrish/stationary/flourrish-bizcard-mockup.jpg',
            '/assets/projects/flourrish/stationary/flourrish-letterhead-mockup.jpg',
            '/assets/projects/flourrish/stationary/flourrish-brochure-mockup.jpg',
            '/assets/projects/flourrish/stationary/flourrish-brochure-mockup2.jpg',
          ],
          mockupUrl: '/assets/projects/flourrish/flourrish-device-mockup.png',
          content: '',
          tags: ['Environmental', 'FinTech', 'Crowdfunding'],
          type: 'print-only',
          isFeatured: true,
          layout: 'grid-2',
          order: 1,
          completedDate: 'October 2025',
          colorPalette: [
            {
              hex: '#264653',
              rgb: '38, 70, 83',
              cmyk: '54, 16, 0, 67',
              pms: '5405 C',
            },
            {
              hex: '#37baa6',
              rgb: '55, 186, 166',
              cmyk: '70, 0, 11, 27',
              pms: '3262 C',
            },
            {
              hex: '#10192c',
              rgb: '16, 25, 44',
              cmyk: '64, 43, 0, 83',
              pms: '2965 C',
            },
            {
              hex: '#172033',
              rgb: '23, 32, 51',
              cmyk: '55, 37, 0, 80',
              pms: '2965 C',
            },
            {
              hex: '#499f4e',
              rgb: '73, 159, 78',
              cmyk: '54, 0, 51, 38',
              pms: '362 C',
            },
          ],
        },
        {
          title: 'Findash',
          description:
            'An enterprise financial dashboard system built to bring clarity, hierarchy, and control to complex data environments.',
          imageUrl:
            '/assets/projects/findash/findash-web-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/findash/findash-web-mockup-transparent-bg.png',
            '/assets/projects/findash/web app/Desktop.jpg',
            '/assets/projects/findash/web app/Tablet.jpg',
            '/assets/projects/findash/web app/Mobile.jpg',
            '/assets/projects/findash/findash-web-mockup.jpg',
            '/assets/projects/findash/findash-brochure-closeup.jpg',
            '/assets/projects/findash/findash-stationary-mockup.jpg',
            '/assets/projects/findash/findash-bizcard-mockup.jpg',
            '/assets/projects/findash/findash-brochure.jpg',
          ],
          mockupUrl:
            '/assets/projects/findash/findash-web-mockup-transparent-bg.png',
          content: '',
          tags: ['Enterprise', 'FinTech', 'Data Visualization'],
          type: 'print-only',
          isFeatured: true,
          layout: 'grid-2',
          order: 2,
          completedDate: 'August 2025',
          colorPalette: [
            {
              hex: '#0B1F33',
              rgb: '11, 31, 51',
              cmyk: '78, 39, 0, 80',
              pms: '2965 C',
            },
            {
              hex: '#55bdbf',
              rgb: '85, 189, 191',
              cmyk: '55, 1, 0, 25',
              pms: '3252 C',
            },
            {
              hex: '#744476',
              rgb: '116, 68, 118',
              cmyk: '2, 42, 0, 54',
              pms: '520 C',
            },
            {
              hex: '#2a3d58',
              rgb: '42, 61, 88',
              cmyk: '52, 31, 0, 65',
              pms: '534 C',
            },
          ],
        },
        {
          title: 'Pinnacle Solutions',
          description:
            'A corporate brand and UI transformation aligning visual authority with enterprise-scale human capital technology.',
          imageUrl:
            '/assets/projects/pinnacle-solutions/pinnacle-device-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/pinnacle-solutions/pinnacle-device-mockup-transparent-bg.png',
            '/assets/projects/pinnacle-solutions/landing page/desktop.jpg',
            '/assets/projects/pinnacle-solutions/landing page/tablet.jpg',
            '/assets/projects/pinnacle-solutions/landing page/mobile.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-stationary-mockup.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-web-mockup.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-biz-card-mockup.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-brochure1.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-brochure2.jpg',
          ],
          mockupUrl:
            '/assets/projects/pinnacle-solutions/pinnacle-device-mockup-transparent-bg.png',
          content: '',
          tags: ['Corporate', 'Human Capital', 'Brand Transformation'],
          type: 'print-only',
          isFeatured: true,
          order: 3,
          layout: 'grid-2',
          completedDate: 'March 2025',
          colorPalette: [
            {
              hex: '#1a2742',
              rgb: '26, 39, 66',
              cmyk: '61, 41, 0, 74',
              pms: '282 C',
            },
            {
              hex: '#0dc1bf',
              rgb: '13, 193, 191',
              cmyk: '93, 0, 1, 24',
              pms: '3262 C',
            },
            {
              hex: '#DCE5EA',
              rgb: '220, 229, 234',
              cmyk: '6, 2, 0, 8',
              pms: 'Cool Gray 1 C',
            },
            {
              hex: '#eaebe4',
              rgb: '234, 235, 228',
              cmyk: '0, 0, 3, 8',
              pms: '7527 C',
            },
          ],
        },
        {
          title: 'SOFFRA.io',
          description:
            'A climb-first digital ecosystem structured around global elevation performance and scalable competitive architecture.',
          imageUrl:
            '/assets/projects/soffra-brand/soffra-device-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/soffra-brand/soffra-device-mockup-transparent-bg.png',
            '/assets/projects/soffra/soffra-mockup.jpg',
            '/assets/projects/soffra/Landing Page/soffra-landingpage-desktop.jpg',
            '/assets/projects/soffra/Landing Page/soffra-landingpage-tablet.jpg',
            '/assets/projects/soffra/Landing Page/soffra-landingpage-mobile.jpg',
            '/assets/projects/soffra-brand/SOFFRA-Business-Card.jpg',
            '/assets/projects/soffra-brand/soffra-letterhead-mockup.jpg',
            '/assets/projects/soffra-brand/soffra_flyer_mockup.jpg',
            '/assets/projects/soffra-brand/SOFFRA-Climb-Atlas-brochure2.jpg',
            '/assets/projects/soffra-brand/SOFFRA-leave-behind-brochure-1-mockup-1.jpg',
            '/assets/projects/soffra-brand/SOFFRA-leave-behind-brochure-2-mockup-2.jpg',
            '/assets/projects/soffra-brand/SOFFRA-leave-behind-brochure-mockup-3.jpg',
            '/assets/projects/soffra-brand/SOFFRA-jersey.jpg',
          ],
          mockupUrl:
            '/assets/projects/soffra-brand/soffra-device-mockup-transparent-bg.png',
          content: '',
          tags: ['Branding', 'Digital Identity', 'Performance'],
          type: 'print-only',
          isFeatured: true,
          layout: 'grid-2',
          order: 4,
          completedDate: 'March 2025',
          colorPalette: [
            {
              hex: '#00FFFF',
              rgb: '0, 255, 255',
              cmyk: '100, 0, 0, 0',
              pms: 'Process Cyan C',
            },
            {
              hex: '#FF4D00',
              rgb: '255, 77, 0',
              cmyk: '0, 70, 100, 0',
              pms: 'Bright Orange C',
            },
            {
              hex: '#050505',
              rgb: '5, 5, 5',
              cmyk: '45, 25, 0, 92',
              pms: 'Black 6 C',
            },
            {
              hex: '#666666',
              rgb: '102, 102, 102',
              cmyk: '0, 0, 0, 60',
              pms: 'Cool Gray 9 C',
            },
          ],
        },
        {
          title: 'Farmland Consulting',
          description:
            'A heritage-driven brand redesign balancing land stewardship legacy with modern advisory clarity.',
          imageUrl:
            '/assets/projects/farmland/farmland-device-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/farmland/farmland-device-mockup-transparent-bg.png',
            '/assets/projects/farmland/landing page/farmland-landing-page-web-mockup.jpg',
            '/assets/projects/farmland/landing page/farmland-landing-page-tablet.jpg',
            '/assets/projects/farmland/landing page/farmland-landing-page-mobile.jpg',
            '/assets/projects/farmland/main_header_letterhead-mockup.jpg',
            '/assets/projects/farmland/farmland-stationary-mockup.jpg',
            '/assets/projects/farmland/business_card_mockup.jpg',
            '/assets/projects/farmland/FarmlandConsulting-envelope-mockup.jpg',
          ],
          mockupUrl:
            '/assets/projects/farmland/farmland-device-mockup-transparent-bg.png',
          content: '',
          tags: ['Heritage', 'Land Stewardship', 'Advisory'],
          type: 'print-only',
          isFeatured: true,
          layout: 'grid-2',
          order: 5,
          completedDate: 'January 2025',
          colorPalette: [
            {
              hex: '#10202F',
              rgb: '16, 32, 47',
              cmyk: '66, 32, 0, 82',
              pms: '296 C',
            },
            {
              hex: '#fbaf44',
              rgb: '251, 175, 68',
              cmyk: '0, 30, 73, 2',
              pms: '137 C',
            },
            {
              hex: '#4e8abe',
              rgb: '78, 138, 190',
              cmyk: '59, 27, 0, 25',
              pms: '660 C',
            },
          ],
        },
        {
          title: 'The Service Course',
          description:
            'A premium performance retail identity expressing culture, confidence, and disciplined brand structure.',
          imageUrl:
            '/assets/projects/the-service-course/theServiceCourse-device-mockup-transparent-background.png',
          gallery: [
            '/assets/projects/the-service-course/theServiceCourse-device-mockup-transparent-background.png',
            '/assets/projects/the-service-course/landing-page/service-course-desktop.jpg',
            '/assets/projects/the-service-course/landing-page/service-course-tablet.jpg',
            '/assets/projects/the-service-course/landing-page/service-course-mobile.jpg',
            '/assets/projects/the-service-course/theServiceCourse-bizcard-mockup.jpg',
            '/assets/projects/the-service-course/theServiceCourse-stationary-mockup.jpg',
            '/assets/projects/the-service-course/servicecourse-postcard-mockup.jpg',
            '/assets/projects/the-service-course/tag-mockup.jpg',
          ],
          mockupUrl:
            '/assets/projects/the-service-course/theServiceCourse-device-mockup-transparent-background.png',
          content: '',
          tags: ['Retail', 'Premium', 'Performance'],
          type: 'print-only',
          isFeatured: true,
          layout: 'grid-2',
          order: 6,
          completedDate: 'February 2025',
          colorPalette: [
            {
              hex: '#07749d',
              rgb: '7, 116, 157',
              cmyk: '96, 26, 0, 38',
              pms: '2188 C',
            },
            {
              hex: '#045372',
              rgb: '4, 83, 114',
              cmyk: '96, 27, 0, 55',
              pms: '2187 C',
            },
            {
              hex: '#d9d6d7',
              rgb: '217, 214, 215',
              cmyk: '0, 1, 1, 15',
              pms: 'Cool Gray 2 C',
            },
            {
              hex: '#D8D6D6',
              rgb: '216, 214, 214',
              cmyk: '0, 1, 1, 15',
              pms: 'Cool Gray 2 C',
            },
          ],
        },
        {
          title: 'Sorella Home Solutions',
          description:
            'A trust-driven service brand built from launch to communicate reliability across digital and print touchpoints.',
          imageUrl:
            '/assets/projects/sorella/sorella-device-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/sorella/sorella-device-mockup-transparent-bg.png',
            '/assets/projects/sorella/Landing Page/sorella-desktop.jpg',
            '/assets/projects/sorella/Landing Page/sorella-tablet.jpg',
            '/assets/projects/sorella/Landing Page/sorella-mobile.jpg',
            '/assets/projects/sorella/stationary web/sorella-business-card-mockup.jpg',
            '/assets/projects/sorella/stationary web/sorella-postcard-mockup.jpg',
            '/assets/projects/sorella/stationary web/sorella-stationary-mockup2.jpg',
            '/assets/projects/sorella/stationary web/sorella-envelope-mpckup.jpg',
            '/assets/projects/sorella/email/sorella-email-mockup.jpg',
          ],
          mockupUrl:
            '/assets/projects/sorella/sorella-device-mockup-transparent-bg.png',
          content: '',
          tags: ['Service Brand', 'Trust', 'Reliability'],
          type: 'print-only',
          isFeatured: true,
          layout: 'grid-2',
          order: 7,
          completedDate: 'October 2025',
          colorPalette: [
            {
              hex: '#092642',
              rgb: '9, 38, 66',
              cmyk: '86, 42, 0, 74',
              pms: '282 C',
            },
            {
              hex: '#37a6ed',
              rgb: '55, 166, 237',
              cmyk: '77, 30, 0, 7',
              pms: '285 C',
            },
            {
              hex: '#e6f0fe',
              rgb: '230, 240, 254',
              cmyk: '9, 6, 0, 0',
              pms: '656 C',
            },
          ],
        },
        {
          title: 'Tour de France Mountain Climb Series',
          description:
            'A stunning poster series celebrating legendary mountain climbs.',
          imageUrl: '/assets/projects/tour-de-france/tourmalet.jpg',
          gallery: [
            '/assets/projects/tour-de-france/tourmalet.jpg',
            '/assets/projects/tour-de-france/stelvio.jpg',
            '/assets/projects/tour-de-france/alpe_Dhuez.jpg',
            '/assets/projects/tour-de-france/aubisque.jpg',
            '/assets/projects/tour-de-france/flandeers.jpg',
            '/assets/projects/tour-de-france/galibier.jpg',
            '/assets/projects/tour-de-france/gavia.jpg',
            '/assets/projects/tour-de-france/madeleine.jpg',
            '/assets/projects/tour-de-france/montventoux.jpg',
            '/assets/projects/tour-de-france/parisroubaix.jpg',
          ],
          mockupUrl: '/assets/projects/tour-de-france/tourmalet.jpg',
          content:
            'Limited-edition posters capturing the beauty and challenge of iconic mountain passes.',
          tags: ['Print', 'Poster Series'],
          type: 'poster-print',
          layout: 'grid-3',
          order: 8,
          completedDate: 'February 2025',
        },
        {
          title: "Martha's Vineyard Poster Series",
          description:
            'A vintage-inspired collection of maps and posters for Martha’s Vineyard.',
          imageUrl: '/assets/projects/mv/state-beach.jpg',
          gallery: [
            '/assets/projects/mv/state-beach.jpg',
            '/assets/projects/mv/katama-airpark.jpg',
            '/assets/projects/mv/aquinnah.jpg',
            '/assets/projects/mv/cape-poge.jpg',
            '/assets/projects/mv/corbin-norton.jpg',
            '/assets/projects/mv/flying-horses.jpg',
          ],
          mockupUrl: '/assets/projects/mv/state-beach.jpg',
          content:
            'A comprehensive series of high-quality prints celebrating the unique geography of Martha’s Vineyard.',
          tags: ['Print', 'Graphic Design'],
          type: 'poster-print',
          layout: 'grid-3',
          order: 9,
          completedDate: 'March 2025',
        },
        {
          title: 'New England Ski Resort Poster Series',
          description:
            'Highly detailed topographic maps and posters of New England ski areas.',
          imageUrl: '/assets/projects/ski-maps/killington.jpg',
          gallery: [
            '/assets/projects/ski-maps/killington.jpg',
            '/assets/projects/ski-maps/stowe.jpg',
            '/assets/projects/ski-maps/jay-peak.jpg',
            '/assets/projects/ski-maps/attitash-bearpeak.jpg',
            '/assets/projects/ski-maps/berkshire-east.jpg',
            '/assets/projects/ski-maps/bolton-valley.jpg',
            '/assets/projects/ski-maps/bretton-woods.jpg',
            '/assets/projects/ski-maps/bromley.jpg',
            '/assets/projects/ski-maps/burke.jpg',
            '/assets/projects/ski-maps/cannon.jpg',
            '/assets/projects/ski-maps/gunstock.jpg',
            '/assets/projects/ski-maps/loon.jpg',
            '/assets/projects/ski-maps/mad-river-glen.jpg',
            '/assets/projects/ski-maps/mount-snow.jpg',
            '/assets/projects/ski-maps/okemo.jpg',
            '/assets/projects/ski-maps/pats-peak.jpg',
            '/assets/projects/ski-maps/pico.jpg',
            '/assets/projects/ski-maps/smuggs.jpg',
            '/assets/projects/ski-maps/stratton.jpg',
            '/assets/projects/ski-maps/sugarbush.jpg',
            '/assets/projects/ski-maps/sugarloaf.jpg',
            '/assets/projects/ski-maps/sunapee.jpg',
            '/assets/projects/ski-maps/sunday-river.jpg',
            '/assets/projects/ski-maps/waterville-valley.jpg',
            '/assets/projects/ski-maps/whiteface.jpg',
            '/assets/projects/ski-maps/wildcat.jpg',
          ],
          mockupUrl: '/assets/projects/ski-maps/killington.jpg',
          content:
            'A series of over 26 unique maps capturing the intricate trail systems of major New England resorts.',
          tags: ['Print', 'Cartography'],
          type: 'poster-print',
          layout: 'grid-2',
          order: 10,
          completedDate: 'May 2025',
        },
        {
          title: 'Rasputitsa Gravel Race Poster Series',
          description:
            'Grit-filled, high-impact posters for the legendary Rasputitsa spring classic.',
          imageUrl: '/assets/projects/rasputitsa/2019rasputitsa.jpg',
          gallery: [
            '/assets/projects/rasputitsa/2017RASP_Framed_Mockup.jpg',
            '/assets/projects/rasputitsa/2018rasputitsa.jpg',
            '/assets/projects/rasputitsa/2019rasputitsa.jpg',
          ],
          mockupUrl: '/assets/projects/rasputitsa/2019rasputitsa.jpg',
          content:
            'Aggressive typography and rugged aesthetic reflecting the spirit of the riders.',
          tags: ['Print', 'Poster Design'],
          type: 'poster-print',
          layout: 'grid-3',
          order: 11,
          completedDate: 'April 2025',
        },
        {
          title: 'The Hellhole Gravel Grind',
          description:
            'Aggressive brand identity and apparel for a premiere South Carolina gravel event.',
          imageUrl: '/assets/projects/hellhole/HellHole.jpg',
          gallery: [
            '/assets/projects/hellhole/HellHole.jpg',
            '/assets/projects/hellhole/HellHole_6.jpg',
            '/assets/projects/hellhole/ccap_insta4.jpg',
          ],
          mockupUrl: '/assets/projects/hellhole/HellHole.jpg',
          content:
            'A "devilish" and high-impact visual identity reflecting the difficulty of the race.',
          tags: ['Print', 'Apparel Design'],
          type: 'poster-print',
          layout: 'grid-2',
          order: 12,
          completedDate: 'May 2025',
        },
      ];

      for (const projectData of initialProjects) {
        try {
          const created = await this.projectsService.create(projectData);
          this.logger.log(
            `Added project: ${created.title} (ID: ${created.id}, Type: ${created.type}, Order: ${created.order})`,
          );
        } catch (e) {
          this.logger.error(`Failed to add project ${projectData.title}:`, e);
        }
      }

      // Save seeder version to prevent re-seeding
      try {
        let settings = await this.settingsRepository.findOneBy({
          key: 'seeder_version',
        });
        if (!settings) {
          settings = this.settingsRepository.create({ key: 'seeder_version' });
        }
        settings.heroTitle = SEEDER_VERSION;
        await this.settingsRepository.save(settings);
        this.logger.log(
          `Project seeding completed successfully. Version ${SEEDER_VERSION} saved.`,
        );
      } catch (e) {
        this.logger.error('Failed to save seeder version:', e);
      }
    } catch (error) {
      this.logger.error('Failed to seed projects:', error);
    }
  }
}
