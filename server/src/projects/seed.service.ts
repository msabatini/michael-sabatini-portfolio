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
    const SEEDER_VERSION = 'v219';
    this.logger.log(`FORCE SEED: v219`);
    this.logger.log(`Starting project seeding process [${SEEDER_VERSION}]...`);

    try {
      // Check if we already seeded this version
      const settings = await this.settingsRepository.findOneBy({
        key: 'seeder_version',
      });
      if (settings && settings.heroTitle === SEEDER_VERSION) {
        this.logger.log(
          `Seeding version ${SEEDER_VERSION} already applied. Skipping.`,
        );
        return;
      }

      console.log('SEEDER: Seeding needed. Clearing database...');
      await this.projectsService.clearAll();
      console.log('SEEDER: Database cleared.');

      const initialProjects = [
        {
          title: 'Findash',
          description:
            'FINDASH — Real-Time Financial Intelligence Platform. A modern financial dashboard platform designed to transform complex operational data into clear, real-time insight.',
          imageUrl: '/assets/projects/findash/findash-web-mockup.jpg',
          gallery: [
            '/assets/projects/findash/findash-brochure-closeup.jpg',
            '/assets/projects/findash/findash-stationary-mockup.jpg',
            '/assets/projects/findash/findash-bizcard-mockup.jpg',
            '/assets/projects/findash/findash-brochure.jpg',
            '/assets/projects/findash/findash-envelope-mockup.jpg',
            '/assets/projects/findash/findash-web-mockup.jpg',
            '/assets/projects/findash/findash-logo.jpg',
          ],
          mockupUrl: '/assets/projects/findash/findash-web-mockup.jpg',
          content:
            'Findash is a cutting-edge fintech company that provides advanced dashboard technology for financial institutions. The branding project focused on creating a clean, professional, and tech-forward visual identity.',
          tags: ['Branding', 'Print', 'FinTech'],
          type: 'print-only',
          layout: 'grid-2',
          order: 0,
          completedDate: 'August 2025',
          colorPalette: [
            { hex: '#0B1F33', rgb: '11, 31, 51', cmyk: '78, 39, 0, 80', pms: '2965 C' },
            { hex: '#55bdbf', rgb: '85, 189, 191', cmyk: '55, 1, 0, 25', pms: '3252 C' },
            { hex: '#744476', rgb: '116, 68, 118', cmyk: '2, 42, 0, 54', pms: '520 C' },
            { hex: '#2a3d58', rgb: '42, 61, 88', cmyk: '52, 31, 0, 65', pms: '534 C' },
            { hex: '#dadada', rgb: '218, 218, 218', cmyk: '0, 0, 0, 15', pms: 'Cool Gray 2 C' }
          ],
          year: '2025',
          role: 'Lead Product Designer',
          overview: {
            lead: 'Findash is a cutting-edge fintech platform that provides advanced dashboard technology for financial institutions. The project focused on creating a clean, professional, and tech-forward visual identity that reflects real-time financial intelligence.',
            bullets: [
              'Designed a comprehensive design system for financial data visualization',
              'Developed a modular component library for consistent dashboard implementation',
              'Collaborated with stakeholders to define key performance indicators and reporting metrics',
            ],
          },
          product: {
            problem: 'Financial data is often fragmented and difficult to interpret in real-time, leading to delayed decision-making and operational inefficiencies.',
            uxChallenge: 'The main challenge was creating a highly dense yet readable interface that allows users to monitor multiple data streams without cognitive overload.',
            decisions: [
              'Implemented a customizable widget system for personalized reporting',
              'Used a high-contrast color palette for critical data alerts and trends',
              'Designed responsive layouts for seamless transition between desktop and mobile views',
            ],
          },
          build: {
            responsibilities: [
              'Visual identity & brand strategy',
              'UX/UI design for the core dashboard platform',
              'Component library development & documentation',
              'Data visualization research & implementation',
            ],
            stack: ['Angular', 'D3.js', 'TypeScript', 'Node.js', 'Express'],
            status: 'Production-ready. Currently used by mid-market financial firms for operational tracking.',
          },
        },
        {
          title: 'Pinnacle Solutions',
          description:
            'High-end corporate branding and digital presence for a global technology solutions provider.',
          imageUrl:
            '/assets/projects/pinnacle-solutions-web/pinnacle-web-mockup.jpg',
          gallery: [
            '/assets/projects/pinnacle-solutions/pinnacle-stationary-mockup.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-letterhead-mockup.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-envelope-mockup.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-web-mockup.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-biz-card-mockup.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-brochure1.jpg',
            '/assets/projects/pinnacle-solutions/pinnacle-brochure2.jpg',
          ],
          mockupUrl:
            '/assets/projects/pinnacle-solutions-web/pinnacle-web-mockup.jpg',
          content:
            'Pinnacle Solutions is a leading provider of enterprise-grade technology and consulting services.',
          tags: ['Branding', 'Print', 'Graphic Design'],
          type: 'print-only',
          order: 1,
          layout: 'grid-2',
          completedDate: 'March 2025',
          colorPalette: [
            { hex: '#1a2742', rgb: '26, 39, 66', cmyk: '61, 41, 0, 74', pms: '282 C' },
            { hex: '#0dc1bf', rgb: '13, 193, 191', cmyk: '93, 0, 1, 24', pms: '3262 C' },
            { hex: '#faf7f8', rgb: '250, 247, 248', cmyk: '0, 1, 1, 2', pms: 'Cool Gray 1 C' },
            { hex: '#eaebe4', rgb: '234, 235, 228', cmyk: '0, 0, 3, 8', pms: '7527 C' }
          ],
          year: '2025',
          role: 'Design Lead · Brand Strategist',
          overview: {
            lead: 'Pinnacle Solutions required a high-end corporate brand identity that could scale globally across technology and consulting sectors. The project involved a complete visual system, from stationary to digital presence.',
            bullets: [
              'Developed a global brand identity and comprehensive style guide',
              'Designed a full suite of corporate stationary and marketing collateral',
              'Collaborated with the digital team to ensure seamless brand integration across web platforms',
            ],
          },
          product: {
            problem: 'The existing brand lacked cohesion and failed to communicate the company’s enterprise-grade technical expertise to a global audience.',
            uxChallenge: 'Creating a visual language that feels both technically precise and approachable for executive-level decision-makers.',
            decisions: [
              'Selected a sophisticated color palette that balances stability with innovation',
              'Developed custom iconography to represent complex consulting services',
              'Designed high-impact print layouts for corporate capabilities brochures',
            ],
          },
          build: {
            responsibilities: [
              'Creative direction & brand identity development',
              'Print production management & quality control',
              'Stakeholder presentation & feedback iteration',
            ],
            stack: ['Adobe Creative Suite', 'Figma', 'InDesign', 'Illustrator'],
            status: 'Completed brand rollout. All corporate assets have been deployed across international offices.',
          },
        },
        {
          title: 'The Service Course',
          description:
            'Premium brand identity and technical apparel for a high-end cycling experience center.',
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
            '/assets/projects/the-service-course/Ads/1080x1080.jpg',
            '/assets/projects/the-service-course/Ads/1080x1350.jpg',
            '/assets/projects/the-service-course/Ads/1080x1920.jpg',
            '/assets/projects/the-service-course/Ads/1200x1200.jpg',
            '/assets/projects/the-service-course/Ads/250x350.jpg',
            '/assets/projects/the-service-course/Ads/300x600.jpg',
            '/assets/projects/the-service-course/Ads/768x90@2x.jpg',
          ],
          mockupUrl:
            '/assets/projects/the-service-course/theServiceCourse-device-mockup-transparent-background.png',
          content:
            'The Service Course project involved creating a sophisticated, performance-oriented visual identity that resonates with dedicated cyclists and the pursuit of professional-grade service.',
          tags: ['Branding', 'Print', 'Apparel Design'],
          type: 'print-only',
          layout: 'grid-2',
          order: 4,
          completedDate: 'February 2025',
          colorPalette: [
            { hex: '#07749d', rgb: '7, 116, 157', cmyk: '96, 26, 0, 38', pms: '2188 C' },
            { hex: '#045372', rgb: '4, 83, 114', cmyk: '96, 27, 0, 55', pms: '2187 C' },
            { hex: '#d9d6d7', rgb: '217, 214, 215', cmyk: '0, 1, 1, 15', pms: 'Cool Gray 2 C' }
          ],
          year: '2024',
          role: 'Product Designer · Brand Identity',
          overview: {
            lead: 'The Service Course project involved creating a sophisticated, performance-oriented visual identity for a high-end cycling service center. The branding system covers digital presence, social campaigns, and technical product packaging.',
            bullets: [
              'Defined a minimalist yet impactful visual language for high-end cycling services',
              'Designed a full suite of digital social ads and marketing campaigns',
              'Developed technical apparel tags and product packaging for professional-grade cleaning tools',
            ],
          },
          product: {
            problem: 'The brand needed to transition from a local service center to a premium product and experience provider with a global outlook.',
            uxChallenge: 'Balancing the grit of a bicycle workshop with the luxury of high-performance cycling culture.',
            decisions: [
              'Used a deep, technical color palette to evoke professional workshop environments',
              'Focused on typography-driven layouts for social campaigns to ensure message clarity',
              'Designed technical tag systems that emphasize product durability and professional heritage',
            ],
          },
          build: {
            responsibilities: [
              'Visual identity system & brand guidelines',
              'Social media campaign creative & production',
              'Technical apparel & packaging design',
            ],
            stack: ['Figma', 'Adobe Creative Suite', 'InDesign', 'HTML/CSS'],
            status: 'Completed brand rollout and campaign launch. Assets are currently active across all social channels.',
          },
        },
        {
          title: 'Farmland Consulting',
          description:
            'Comprehensive brand identity and stationery design for a specialized agricultural consultancy.',
          imageUrl:
            '/assets/projects/farmland/landing page/farmland-landing-page-web-mockup.jpg',
          gallery: [
            '/assets/projects/farmland/landing page/farmland-landing-page-web-mockup.jpg',
            '/assets/projects/farmland/main_header_letterhead-mockup.jpg',
            '/assets/projects/farmland/farmland-stationary-mockup.jpg',
            '/assets/projects/farmland/envelope-mockup.jpg',
            '/assets/projects/farmland/business_card_mockup.jpg',
            '/assets/projects/farmland/FarmlandConsulting_logo.jpg',
          ],
          mockupUrl:
            '/assets/projects/farmland/landing page/farmland-landing-page-web-mockup.jpg',
          content:
            'Farmland Consulting provides expert advisory services to the agricultural sector.',
          tags: ['Branding', 'Print', 'Identity'],
          type: 'print-only',
          isFeatured: true,
          order: 3,
          layout: 'grid-2',
          completedDate: 'January 2025',
          colorPalette: [
            { hex: '#10202F', rgb: '16, 32, 47', cmyk: '66, 32, 0, 82', pms: '296 C' },
            { hex: '#fbaf44', rgb: '251, 175, 68', cmyk: '0, 30, 73, 2', pms: '137 C' },
            { hex: '#4e8abe', rgb: '78, 138, 190', cmyk: '59, 27, 0, 25', pms: '660 C' },
            { hex: '#162a3c', rgb: '22, 42, 60', cmyk: '63, 30, 0, 76', pms: '2965 C' }
          ],
          year: '2024',
          role: 'Lead Brand Designer',
          overview: {
            lead: 'Farmland Consulting required a professional and grounded brand identity to serve the agricultural sector. The project involved creating a visual system that conveys trust, expertise, and a deep connection to land preservation and agricultural advisory.',
            bullets: [
              'Designed a unique visual identity that balances modern consultancy with traditional agricultural values',
              'Developed a comprehensive stationery system including letterheads, business cards, and envelopes',
              'Created a responsive landing page design that highlights the company’s core advisory services',
            ],
          },
          product: {
            problem: 'The previous branding felt outdated and didn’t accurately reflect the company’s high-level consultancy and preservation expertise.',
            uxChallenge: 'Integrating technical agricultural data with a warm, approachable brand aesthetic for a diverse client base.',
            decisions: [
              'Selected an earthy, nature-inspired color palette that reflects the agricultural focus',
              'Used clean, traditional typography to establish authority and reliability',
              'Designed stationery layouts that emphasize clarity and professional documentation',
            ],
          },
          build: {
            responsibilities: [
              'Brand strategy & visual identity development',
              'Print collateral design & production management',
              'UI design for the consultancy landing page',
            ],
            stack: ['Figma', 'Illustrator', 'Photoshop', 'InDesign'],
            status: 'Completed brand identity rollout. All physical and digital assets are currently in use by the consultancy.',
          },
        },
        {
          title: 'SOFFRA.io',
          description:
            'SOFFRA is a global social platform for cyclists and runners, built around the pursuit of elevation. Through its interactive CLIMB ATLAS™ system, athletes can explore, track, and compete on thousands of uphill segments across the world.',
          imageUrl:
            '/assets/projects/soffra-brand/soffra-device-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/soffra/soffra-mockup.jpg',
            '/assets/projects/soffra/soffra-main-hero.jpg',
            '/assets/projects/soffra/climb-atlas-world.jpg',
            '/assets/projects/soffra/climb-atlas-world-list.png',
            '/assets/projects/soffra/climb-atlas-world-ranking.png',
            '/assets/projects/soffra/climb-atlas-country.png',
            '/assets/projects/soffra/climb-atlas-country-list.png',
            '/assets/projects/soffra/climb-atlas-climb-page-top.png',
            '/assets/projects/soffra/climb-atlas-climb-page-map.png',
            '/assets/projects/soffra/climb-atlas-climb-list.png',
            '/assets/projects/soffra/climb-atlas-climb-cards.png',
            '/assets/projects/soffra/climb-atlas-leader-board-topten.png',
            '/assets/projects/soffra/climb-atlas-24-forecast.png',
            '/assets/projects/soffra-brand/SOFFRA-Business-Card.jpg',
            '/assets/projects/soffra-brand/soffra-letterhead-mockup.jpg',
            '/assets/projects/soffra/soffra_flyer_mockup.jpg',
            '/assets/projects/soffra-brand/SOFFRA-jersey.jpg',
            '/assets/projects/soffra-brand/SOFFRA-leave-behind-brochure-mockup-3.jpg',
            '/assets/projects/soffra-brand/SOFFRA-leave-behind-brochure-1-mockup-1.jpg',
            '/assets/projects/soffra-brand/SOFFRA-leave-behind-brochure-2-mockup-2.jpg',
          ],
          mockupUrl:
            '/assets/projects/soffra-brand/soffra-device-mockup-transparent-bg.png',
          content:
            'The SOFFRA.io branding project involved creating a cohesive and high-impact visual identity that spans across digital and physical touchpoints, including specialized cycling apparel and marketing collateral.',
          tags: ['Branding', 'Print', 'Identity'],
          type: 'print-only',
          layout: 'grid-2',
          order: 2,
          completedDate: 'March 2025',
          colorPalette: [
            { hex: '#050505', rgb: '5, 5, 5', cmyk: '45, 25, 0, 92', pms: 'Black 6 C' },
            { hex: '#FF4D00', rgb: '255, 77, 0', cmyk: '0, 70, 100, 0', pms: 'Bright Orange C' },
            { hex: '#666666', rgb: '102, 102, 102', cmyk: '0, 0, 0, 60', pms: 'Cool Gray 9 C' },
            { hex: '#00FFFF', rgb: '0, 255, 255', cmyk: '100, 0, 0, 0', pms: 'Process Cyan C' },
            { hex: '#333235', rgb: '51, 50, 53', cmyk: '4, 6, 0, 79', pms: '447 C' }
          ],
          year: '2022',
          role: 'Founder · Product Designer · Frontend Developer',
          overview: {
            lead: 'SOFFRA.io is a concept-stage social platform for elevation-focused cyclists and runners. It’s centered around the CLIMB ATLAS™—a structured library of climbs designed for discovery, comparison, and competition.',
            bullets: [
              'Led the product from concept through prototype (UX, UI, IA)',
              'Defined the climb taxonomy + metadata model that powers the Atlas',
              'Iterating weekly with athlete testers to refine usability and prioritization',
            ],
          },
          product: {
            problem: 'General fitness platforms track climbs, but they don’t treat elevation as a first-class system. SOFFRA organizes climb discovery, effort tracking, and ranking around difficulty and context.',
            uxChallenge: 'The hardest UX problem was integrating the climb database, user profile, and leaderboard logic so effort data feels meaningful without overwhelming the interface.',
            decisions: [
              'Progressive disclosure for performance metrics (scan → drill-down)',
              'Clear hierarchy between climb entities and athlete effort objects',
              'Leaderboards contextualized by climb difficulty, not raw speed alone',
            ],
          },
          build: {
            responsibilities: [
              'Product strategy + information architecture',
              'Interaction design + visual system',
              'Frontend implementation (component-driven UI)',
              'Dataset research + structuring for JSON-driven integration',
            ],
            stack: ['MongoDB', 'Express', 'Angular', 'Node', 'TypeScript', 'SCSS'],
            status: 'In active development. Multiple athletes test weekly; feedback informs usability refinements and feature prioritization.',
          },
        },
        {
          title: 'Sorella Home Solutions',
          description:
            'Comprehensive brand identity and print collateral for a premium home concierge service.',
          imageUrl: '/assets/projects/sorella/sorella-device-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/sorella/sorella-device-mockup-transparent-bg.png',
            '/assets/projects/sorella/Landing Page/sorella-desktop.jpg',
            '/assets/projects/sorella/Landing Page/sorella-tablet.jpg',
            '/assets/projects/sorella/Landing Page/sorella-mobile.jpg',
            '/assets/projects/sorella/stationary web/sorella-business-card-mockup.jpg',
            '/assets/projects/sorella/stationary web/sorella-postcard-mockup.jpg',
            '/assets/projects/sorella/stationary web/sorella-envelope-mpckup.jpg',
            '/assets/projects/sorella/stationary web/sorella-stationary-mockup2.jpg',
            '/assets/projects/sorella/email/sorella-email.jpg',
            '/assets/projects/sorella/email/sorella-email-mockup.jpg',
          ],
          mockupUrl: '/assets/projects/sorella/sorella-device-mockup-transparent-bg.png',
          content:
            'Brand identity development and print materials for Sorella Home Solutions.',
          tags: ['Branding', 'Print', 'Identity'],
          type: 'print-only',
          layout: 'grid-2',
          order: 5,
          completedDate: 'October 2025',
          colorPalette: [
            { hex: '#092642', rgb: '9, 38, 66', cmyk: '86, 42, 0, 74', pms: '282 C' },
            { hex: '#37a6ed', rgb: '55, 166, 237', cmyk: '77, 30, 0, 7', pms: '285 C' },
            { hex: '#e6f0fe', rgb: '230, 240, 254', cmyk: '9, 6, 0, 0', pms: '656 C' },
            { hex: '#2e3340', rgb: '46, 51, 64', cmyk: '28, 20, 0, 75', pms: '432 C' }
          ],
          year: '2025',
          role: 'Lead Designer · Brand Strategist',
          overview: {
            lead: 'Sorella Home Solutions required a premium brand identity and digital presence to serve high-end home concierge clients. The project spanned from brand strategy and physical collateral to a sophisticated, responsive corporate website.',
            bullets: [
              'Developed a high-end visual identity reflecting trust, reliability, and sophisticated care',
              'Designed and developed a responsive corporate website for service showcase',
              'Created a full suite of marketing collateral, including stationery, social ads, and email templates',
            ],
          },
          product: {
            problem: 'The brand needed to communicate a sense of "quiet luxury" while clearly outlining a complex range of home concierge services.',
            uxChallenge: 'Creating a web interface that feels as high-end as the service itself, while ensuring a simple and direct booking/contact experience.',
            decisions: [
              'Selected a refined color palette of deep navy and soft light blue to evoke professional reliability',
              'Used generous whitespace and high-quality imagery to emphasize the "concierge" experience',
              'Designed modular social ad systems for consistent brand messaging across channels',
            ],
          },
          build: {
            responsibilities: [
              'Brand strategy & visual identity design',
              'UX/UI design & frontend development for the corporate site',
              'Social media campaign creative & production',
            ],
            stack: ['Angular', 'SCSS', 'TypeScript', 'Adobe Creative Suite', 'Figma'],
            status: 'Production-ready. The website and marketing materials are currently active and driving client acquisitions.',
          },
        },
        {
          title: 'Clinical Resources',
          description:
            'Advanced assessment platform branding and print collateral for speech-language pathologists.',
          imageUrl: '/assets/projects/clinical/clinical-resources-device-mockup-trasnparent-bg.png',
          gallery: [
            '/assets/projects/clinical/clinical-resources-device-mockup-trasnparent-bg.png',
            '/assets/projects/clinical/Landing Page/clinical-resources-desktop.jpg',
            '/assets/projects/clinical/Landing Page/clinical-resources-tablet.jpg',
            '/assets/projects/clinical/Landing Page/clinical-resources-mobile.jpg',
            '/assets/projects/clinical/Print/clinical-resources-bizcard-mockup.jpg',
            '/assets/projects/clinical/Print/clinical-resources-brochure.jpg',
            '/assets/projects/clinical/Print/clinical-resources-envelope-mockup.jpg',
            '/assets/projects/clinical/Print/clinical-resources-letterhead.jpg',
            '/assets/projects/clinical/Print/clinical-resources-stationary.jpg',
          ],
          mockupUrl: '/assets/projects/clinical/clinical-resources-device-mockup-trasnparent-bg.png',
          content:
            'Brand identity development and specialized print materials for Clinical Resources Assessment Platform.',
          tags: ['Branding', 'Print', 'Healthcare'],
          type: 'print-only',
          layout: 'grid-2',
          order: 6,
          completedDate: 'November 2025',
          colorPalette: [
            { hex: '#cf3178', rgb: '207, 49, 120', cmyk: '0, 76, 42, 19', pms: '213 C' },
            { hex: '#6dc4e1', rgb: '109, 196, 225', cmyk: '52, 13, 0, 12', pms: '298 C' },
            { hex: '#0c1624', rgb: '12, 22, 36', cmyk: '67, 39, 0, 86', pms: '2965 C' },
            { hex: '#0d223c', rgb: '13, 34, 60', cmyk: '78, 43, 0, 76', pms: '282 C' }
          ],
          year: '2025',
          role: 'Lead Product Designer',
          overview: {
            lead: 'Clinical Resources is an advanced digital assessment platform designed specifically for speech-language pathologists. The project involved creating a professional, trust-based visual identity and a highly usable interface for diagnostic assessments.',
            bullets: [
              'Led the product strategy and visual system development for a specialized healthcare platform',
              'Designed a comprehensive suite of digital and physical assessment tools and collateral',
              'Developed a modular design system to ensure consistency across complex diagnostic workflows',
            ],
          },
          product: {
            problem: 'Existing speech assessment tools are often fragmented, difficult to navigate, and lack a modern, professional aesthetic that builds clinician trust.',
            uxChallenge: 'Creating a diagnostic interface that is both mathematically precise and easy for clinicians to use during active patient sessions.',
            decisions: [
              'Implemented a high-contrast color palette to ensure readability in diverse clinical environments',
              'Developed a clear typographic hierarchy for complex medical and diagnostic data',
              'Designed responsive assessment views to accommodate use on both tablets and desktop workstations',
            ],
          },
          build: {
            responsibilities: [
              'Product strategy & information architecture',
              'Visual system & brand identity development',
              'UI/UX design for the core assessment engine',
            ],
            stack: ['Angular', 'SCSS', 'TypeScript', 'Node.js', 'Figma'],
            status: 'In active production. The platform is currently being used by specialized SLP practices for patient diagnostics.',
          },
        },
        {
          title: 'Flourrish Environmental Funding',
          description:
            'Global crowdsourcing platform for funding environmental restoration.',
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
          ],
          mockupUrl: '/assets/projects/flourrish/flourrish-device-mockup.png',
          content:
            'Flourrish is a revolutionary environmental fintech platform.',
          tags: ['Application Development', 'Angular', 'FinTech'],
          type: 'print-only',
          layout: 'grid-2',
          order: 7,
          completedDate: 'October 2025',
          colorPalette: [
            { hex: '#264653', rgb: '38, 70, 83', cmyk: '54, 16, 0, 67', pms: '5405 C' },
            { hex: '#37baa6', rgb: '55, 186, 166', cmyk: '70, 0, 11, 27', pms: '3262 C' },
            { hex: '#10192c', rgb: '16, 25, 44', cmyk: '64, 43, 0, 83', pms: '2965 C' },
            { hex: '#172033', rgb: '23, 32, 51', cmyk: '55, 37, 0, 80', pms: '2965 C' },
            { hex: '#499f4e', rgb: '73, 159, 78', cmyk: '54, 0, 51, 38', pms: '362 C' }
          ],
          year: '2025',
          role: 'Lead Product Designer',
          overview: {
            lead: 'Flourrish is a global crowdsourcing platform for funding environmental restoration. The project focused on creating a transparent, trust-based financial system that enables users to fund and track large-scale environmental projects.',
            bullets: [
              'Developed the product architecture and UX strategy for an environmental fintech platform',
              'Designed a high-impact visual identity reflecting transparency and environmental focus',
              'Created a modular system for tracking and reporting on restoration progress',
            ],
          },
          product: {
            problem: 'Traditional environmental funding is often opaque and lacks direct connection between donors and project impact.',
            uxChallenge: 'Designing a platform that makes complex financial and environmental data accessible and engaging for everyday users.',
            decisions: [
              'Implemented a map-based discovery system for exploring global restoration projects',
              'Developed a "transparent ledger" view for tracking project funding and milestones',
              'Used an organic, nature-inspired color system to align with the platform’s core mission',
            ],
          },
          build: {
            responsibilities: [
              'Product strategy & information architecture',
              'Visual identity & brand development',
              'UX/UI design for the core funding platform',
            ],
            stack: ['Angular', 'SCSS', 'TypeScript', 'D3.js', 'Node.js'],
            status: 'Initial prototype complete. The platform is currently in pilot testing with select environmental NGOs.',
          },
        },
        {
          title: 'Progressive Insurance',
          description:
            'Streamlined digital quoting experience and visual systems for a leading national insurer.',
          imageUrl:
            '/assets/projects/progressive-insurance/progressive-device-mockup-transparent-bg.png',
          gallery: [
            '/assets/projects/progressive-insurance/progressive-device-mockup-transparent-bg.png',
            '/assets/projects/progressive-insurance/progressive7.jpg',
            '/assets/projects/progressive-insurance/progressive-mockup.jpg',
            '/assets/projects/progressive-insurance/progressive1.jpg',
            '/assets/projects/progressive-insurance/progressive2.jpg',
            '/assets/projects/progressive-insurance/progressive3.jpg',
            '/assets/projects/progressive-insurance/progressive4.jpg',
            '/assets/projects/progressive-insurance/progressive5.jpg',
            '/assets/projects/progressive-insurance/progressive6.jpg',
            '/assets/projects/progressive-insurance/progressive8.jpg',
          ],
          mockupUrl:
            '/assets/projects/progressive-insurance/progressive-device-mockup-transparent-bg.png',
          content:
            'Progressive Insurance required a modern, user-centric approach to their digital platforms.',
          tags: ['UI/UX Design', 'Branding', 'Digital Strategy'],
          type: 'print-only',
          isFeatured: false,
          order: 8,
          layout: 'grid-2',
          completedDate: 'May 2025',
          colorPalette: [
            { hex: '#2275e8', rgb: '34, 117, 232', cmyk: '85, 50, 0, 9', pms: '2133 C' },
            { hex: '#F4F4F4', rgb: '244, 244, 244', cmyk: '0, 0, 0, 4', pms: 'Cool Gray 1 C' },
            { hex: '#eaf1f8', rgb: '234, 241, 248', cmyk: '8, 3, 0, 3', pms: '656 C' }
          ],
          year: '2025',
          role: 'Senior UX/UI Designer',
          overview: {
            lead: 'Progressive Insurance required a modern, user-centric approach to their digital quoting platforms. The project focused on streamlining the user journey and creating a cohesive visual system that enhances brand trust and accessibility.',
            bullets: [
              'Developed a high-fidelity design system for multi-channel digital products',
              'Streamlined the digital quoting experience to improve user conversion rates',
              'Collaborated with stakeholders to ensure accessibility and performance standards',
            ],
          },
          product: {
            problem: 'The previous quoting process was fragmented and lacked a modern, cohesive visual language, leading to user friction and lower conversion.',
            uxChallenge: 'Simplifying complex insurance data collection while maintaining user confidence and speed throughout the process.',
            decisions: [
              'Implemented a progressive disclosure model for the quoting workflow',
              'Developed a clean, high-contrast visual system for critical user actions',
              'Designed responsive layouts that prioritize mobile-first interaction for quick quoting',
            ],
          },
          build: {
            responsibilities: [
              'UX architecture & information design',
              'UI design & visual system development',
              'Prototyping & user testing iteration',
            ],
            stack: ['Figma', 'Sketch', 'Adobe Creative Suite', 'InVision'],
            status: 'Implementation complete. The new design system has been integrated across core digital product lines.',
          },
        },

        {
          title: 'Apparent Insurance',
          description:
            'Modern digital experience and brand system for a customer-centric insurance provider.',
          imageUrl:
            '/assets/projects/apparent-insurance/apparent-web-mockup.jpg',
          gallery: [
            '/assets/projects/apparent-insurance/apparent-web-mockup.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_RETRIEVE_MOCKUP.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_HO3_About.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_HO3_AddInfo.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_HO3_Coverage.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_HO3_Exterior.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_HO3_Purchase.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_HO3_ThankYou.jpg',
            '/assets/projects/apparent-insurance/APPARENTINSURANCE_HO3_ssn.jpg',
          ],
          mockupUrl:
            '/assets/projects/apparent-insurance/apparent-web-mockup.jpg',
          content:
            'Apparent Insurance focuses on providing clear, transparent, and family-oriented insurance solutions.',
          tags: ['UX/UI Design', 'UI/UX', 'Digital Identity'],
          type: 'web',
          isFeatured: false,
          order: 10,
          layout: 'grid-2',
          completedDate: 'April 2025',
        },
        {
          title: 'Movement Insurance',
          description:
            'Dynamic brand identity and digital interface design for a modern insurance disruptor.',
          imageUrl: '/assets/projects/movement-insurance/1.jpg',
          gallery: [
            '/assets/projects/movement-insurance/1.jpg',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_1.56.40_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_2.08.24_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_2.13.50_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_2.20.03_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_2.28.47_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_2.30.10_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_2.57.11_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_3.00.03_PM_copy.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_3.03.54_PM.png',
            '/assets/projects/movement-insurance/Screen_Shot_2018-09-14_at_3.06.10_PM_copy.png',
          ],
          mockupUrl: '/assets/projects/movement-insurance/1.jpg',
          content:
            'Movement Insurance is built on the philosophy of constant evolution and user-centricity.',
          tags: ['UX/UI Design', 'UI/UX Design', 'Digital Identity'],
          type: 'web',
          isFeatured: false,
          order: 12,
          layout: 'grid-2',
          completedDate: 'June 2025',
        },
        {
          title: 'Homesite Home Insurance',
          description:
            'Cohesive brand system and digital experience for a leading home insurance provider.',
          imageUrl: '/assets/projects/homesite/1.jpg',
          gallery: [
            '/assets/projects/homesite/1.jpg',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_1.56.03_PM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_10.53.55_AM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_10.54.50_AM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_10.56.14_AM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_10.58.39_AM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_10.59.53_AM.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_11.00.41_AM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_11.01.47_AM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_11.02.58_AM_copy.png',
            '/assets/projects/homesite/Screen_Shot_2018-09-14_at_11.05.23_AM_copy.png',
          ],
          mockupUrl: '/assets/projects/homesite/1.jpg',
          content:
            'Homesite Home Insurance required a modern visual identity that emphasizes reliability and trust.',
          tags: ['UX/UI Design', 'UI/UX Design'],
          type: 'web',
          isFeatured: false,
          order: 13,
          layout: 'grid-2',
          completedDate: 'July 2025',
        },
        {
          title: 'Electric Insurance',
          description:
            'High-performance digital presence and visual overhaul for a premium insurer.',
          imageUrl: '/assets/projects/electric/1.jpg',
          gallery: [
            '/assets/projects/electric/1.jpg',
            '/assets/projects/electric/Electric-About-Desktop_copy.jpg',
            '/assets/projects/electric/Electric-AddInfo-Desktop_copy.jpg',
            '/assets/projects/electric/Electric-Coverage-Desktop_copy.jpg',
            '/assets/projects/electric/Electric-Exterior-Desktop_copy.jpg',
            '/assets/projects/electric/Electric-Interior-Desktop_copy.jpg',
          ],
          mockupUrl: '/assets/projects/electric/1.jpg',
          content:
            'Electric Insurance provides specialized personal and commercial insurance solutions.',
          tags: ['UI/UX Design', 'Branding', 'Digital Identity'],
          type: 'web',
          isFeatured: false,
          order: 14,
          layout: 'grid-2',
          completedDate: 'August 2025',
        },
        {
          title: 'Elephant Insurance',
          description:
            'Comprehensive digital quote-to-bind experience and brand system for a direct-to-consumer insurance provider.',
          imageUrl:
            '/assets/projects/elephant-insurance/elephant-insurance-web-mockup.jpg',
          gallery: [
            '/assets/projects/elephant-insurance/elephant-insurance-web-mockup.jpg',
            '/assets/projects/elephant-insurance/elephant_aboutyou.jpg',
            '/assets/projects/elephant-insurance/elephant_additionalinfo.jpg',
            '/assets/projects/elephant-insurance/elephant_coverage.jpg',
            '/assets/projects/elephant-insurance/elephant_exterior.jpg',
            '/assets/projects/elephant-insurance/elephant_interior.jpg',
            '/assets/projects/elephant-insurance/elephant_purchase.jpg',
          ],
          mockupUrl:
            '/assets/projects/elephant-insurance/elephant-insurance-web-mockup.jpg',
          content:
            'Elephant Insurance focuses on a streamlined, user-friendly digital experience for their auto and home insurance products.',
          tags: ['UX/UI Design', 'Graphic Design', 'Insurance'],
          type: 'web',
          isFeatured: false,
          order: 15,
          layout: 'grid-2',
          completedDate: 'July 2025',
          colorPalette: [
            { hex: '#7B2D26', rgb: '123, 45, 38', cmyk: '0, 63, 69, 52', pms: '1815 C' },
            { hex: '#333333', rgb: '51, 51, 51', cmyk: '0, 0, 0, 80', pms: 'Neutral Black C' },
            { hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', pms: '000 C' }
          ],
          designSpecs: [
            { label: 'Platform', value: 'Web / Responsive', type: 'technical' },
            {
              label: 'Role',
              value: 'Lead Product Designer',
              type: 'technical',
            },
            {
              label: 'Deliverables',
              value: 'UX Architecture, UI Design, Brand Identity',
              type: 'technical',
            },
          ],
        },
        {
          title: 'Sorella Home Solutions',
          description:
            'Sophisticated corporate website for a premium home concierge service company.',
          imageUrl: '/assets/projects/sorella/sorella-mockup.jpg',
          gallery: [
            '/assets/projects/sorella/sorella-case-study10.jpg',
            '/assets/projects/sorella/sorella-case-study1.jpg',
            '/assets/projects/sorella/sorella-case-study2.jpg',
            '/assets/projects/sorella/sorella-case-study3.jpg',
            '/assets/projects/sorella/sorella-case-study4.jpg',
            '/assets/projects/sorella/sorella-case-study5.jpg',
            '/assets/projects/sorella/sorella-case-study6.jpg',
            '/assets/projects/sorella/sorella-case-study7.jpg',
            '/assets/projects/sorella/sorella-case-study8.jpg',
            '/assets/projects/sorella/sorella-case-study9.jpg',
            '/assets/projects/sorella/Ads/1080x1080.jpg',
            '/assets/projects/sorella/Ads/1080x1350.jpg',
            '/assets/projects/sorella/Ads/1080x1920.jpg',
            '/assets/projects/sorella/Ads/1200x1200.jpg',
            '/assets/projects/sorella/Ads/300x600.jpg',
          ],
          mockupUrl: '/assets/projects/sorella/sorella-mockup.jpg',
          content:
            'Developed a professional digital presence for a premium home concierge service.',
          tags: ['Application Development', 'UI/UX Design'],
          type: 'web',
          isFeatured: true,
          order: 0,
          completedDate: 'September 2025',
        },
        {
          title: 'Clinical Resources SLP Platform',
          description:
            'Revolutionary digital assessment platform for speech-language pathologists.',
          imageUrl: '/assets/projects/clinical/clinical-mockup.jpg',
          gallery: [
            '/assets/projects/clinical/cr-hero.jpg',
            '/assets/projects/clinical/cr-main.jpg',
            '/assets/projects/clinical/clinical-case-study1.jpg',
            '/assets/projects/clinical/clinical-case-study2.jpg',
            '/assets/projects/clinical/clinical-case-study3.jpg',
            '/assets/projects/clinical/clinical-case-study4.jpg',
            '/assets/projects/clinical/clinical-case-study5.jpg',
            '/assets/projects/clinical/clinical-case-study6.jpg',
            '/assets/projects/clinical/clinical-case-study7.jpg',
            '/assets/projects/clinical/clinical-case-study8.jpg',
            '/assets/projects/clinical/clinical-case-study9.jpg',
            '/assets/projects/clinical/clinical-case-study10.jpg',
            '/assets/projects/clinical/clinical-case-study11.jpg',
            '/assets/projects/clinical/clinical-case-study12.jpg',
            '/assets/projects/clinical/clinical-case-study13.jpg',
            '/assets/projects/clinical/clinical-case-study14.jpg',
            '/assets/projects/clinical/clinical-case-study15.jpg',
            '/assets/projects/clinical/Print/clinical-resources-bizcard-mockup.jpg',
            '/assets/projects/clinical/Print/clinical-resources-brochure.jpg',
            '/assets/projects/clinical/Print/clinical-resources-envelope-mockup.jpg',
            '/assets/projects/clinical/Print/clinical-resources-letterhead.jpg',
            '/assets/projects/clinical/Print/clinical-resources-stationary.jpg',
          ],
          mockupUrl: '/assets/projects/clinical/clinical-mockup.jpg',
          content:
            'An evidence-based platform designed to empower pathologists with digital tools.',
          tags: ['Application Development', 'Angular', 'Clinical Tech'],
          type: 'web',
          isFeatured: true,
          order: 1,
          completedDate: 'August 2025',
        },
        {
          title: 'SOFFRA Climbing Platform',
          description:
            'Global social media platform for cyclists and mountain climbing enthusiasts.',
          imageUrl: '/assets/projects/soffra/soffra-mockup.jpg',
          gallery: [
            '/assets/projects/soffra/soffra-main-hero.jpg',
            '/assets/projects/soffra/climb-atlas-24-forecast.png',
            '/assets/projects/soffra/climb-atlas-climb-cards-perspective.png',
            '/assets/projects/soffra/climb-atlas-climb-cards.png',
            '/assets/projects/soffra/climb-atlas-climb-list.png',
            '/assets/projects/soffra/climb-atlas-climb-page-map-perspective.png',
            '/assets/projects/soffra/climb-atlas-climb-page-map.png',
            '/assets/projects/soffra/climb-atlas-climb-page-top-perspective.png',
            '/assets/projects/soffra/climb-atlas-climb-page-top.png',
            '/assets/projects/soffra/climb-atlas-climb-page.png',
            '/assets/projects/soffra/soffra-mockup.jpg',
            '/assets/projects/soffra/climb-atlas-country-list.png',
            '/assets/projects/soffra/climb-atlas-country.png',
            '/assets/projects/soffra/climb-atlas-leader-board-perspective.png',
            '/assets/projects/soffra/climb-atlas-leader-board-topten.png',
            '/assets/projects/soffra/climb-atlas-weather-api-perspective.png',
            '/assets/projects/soffra/climb-atlas-weather-api.png',
            '/assets/projects/soffra/climb-atlas-world-list.png',
            '/assets/projects/soffra/climb-atlas-world-rank-list-perspective.png',
            '/assets/projects/soffra/climb-atlas-world-rank-list.png',
            '/assets/projects/soffra/climb-atlas-world-ranking.png',
            '/assets/projects/soffra/climb-atlas-world.png',
          ],
          mockupUrl: '/assets/projects/soffra/soffra-mockup.jpg',
          content:
            'A comprehensive SaaS platform focused on global mountain climbing segments.',
          tags: ['Application Development', 'Angular', 'Node.js'],
          type: 'web',
          isFeatured: true,
          order: 2,
          completedDate: 'June 2022',
        },
        {
          title: 'Pixlhaus Internet Technologies',
          description:
            'Full-service digital agency specializing in high-performance web solutions.',
          imageUrl: '/assets/projects/pixlhaus/pixlhaus-mockup.jpg',
          gallery: [
            '/assets/projects/pixlhaus/pixlhaus-case-study1.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study2.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study3.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study4.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study5.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study6.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study7.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study8.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study9.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study10.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study11.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study12.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study13.jpg',
            '/assets/projects/pixlhaus/pixlhaus-case-study14.jpg',
          ],
          mockupUrl: '/assets/projects/pixlhaus/pixlhaus-mockup.jpg',
          content:
            'Pixlhaus is a comprehensive digital agency delivering pixel-perfect websites.',
          tags: ['Application Development', 'React', 'Angular'],
          type: 'web',
          order: 4,
          completedDate: 'July 2025',
        },
        {
          title: 'Harrison Deller Art',
          description:
            'Digital home for a compulsive creator of images and subconscious manifestations.',
          imageUrl:
            '/assets/projects/harrison-deller-art/harrison-art-mockup.png',
          gallery: [
            '/assets/projects/harrison-deller-art/harrison-art-1.png',
            '/assets/projects/harrison-deller-art/harrison-art-2.png',
            '/assets/projects/harrison-deller-art/harrison-art-3.png',
            '/assets/projects/harrison-deller-art/harrison-art-4.png',
            '/assets/projects/harrison-deller-art/harrison-art-5.png',
            '/assets/projects/harrison-deller-art/harrison-art-6.png',
            '/assets/projects/harrison-deller-art/harrison-art-7.png',
            '/assets/projects/harrison-deller-art/harrison-art-8.png',
            '/assets/projects/harrison-deller-art/harrison-art-9.png',
          ],
          mockupUrl:
            '/assets/projects/harrison-deller-art/harrison-art-mockup.png',
          content:
            'Harrison Deller is a prolific Paraguayan artist and musician.',
          tags: ['Application Development', 'Fine Art', 'Custom CMS'],
          type: 'web',
          order: 5,
          completedDate: 'February 2025',
        },
        {
          title: 'Pinnacle Solutions Web Site',
          description:
            'Sophisticated enterprise web presence for a global technology provider.',
          imageUrl:
            '/assets/projects/pinnacle-solutions-web/pinnacle-web-mockup.jpg',
          gallery: [
            '/assets/projects/pinnacle-solutions-web/pinnacle-web-mockup.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-index-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-services-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-services-page2.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-about-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-clients-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-clients-page2.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-client-benefits-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-human-capital-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-human-capital-page2.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-blog-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-blog-page2.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-white-papers-page2.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-contact-page.jpg',
            '/assets/projects/pinnacle-solutions-web/pinnacle-contact-page2.jpg',
          ],
          mockupUrl:
            '/assets/projects/pinnacle-solutions-web/pinnacle-web-mockup.jpg',
          content:
            'A comprehensive web platform designed to showcase high-end corporate solutions and technology services.',
          tags: ['Application Development', 'UI/UX Design', 'Development'],
          type: 'web',
          order: 7,
          completedDate: 'March 2025',
        },
        {
          title: 'Tour de France Mountain Climb Series',
          description:
            'A stunning poster series celebrating legendary mountain climbs.',
          imageUrl: '/assets/projects/tour-de-france/tourmalet.jpg',
          gallery: [
            '/assets/projects/tour-de-france/tourmalet.jpg',
            '/assets/projects/tour-de-france/stelvio.jpg',
            '/assets/projects/tour-de-france/montventoux.jpg',
            '/assets/projects/tour-de-france/alpe_Dhuez.jpg',
            '/assets/projects/tour-de-france/aubisque.jpg',
            '/assets/projects/tour-de-france/madeleine.jpg',
            '/assets/projects/tour-de-france/flandeers.jpg',
            '/assets/projects/tour-de-france/galibier.jpg',
            '/assets/projects/tour-de-france/gavia.jpg',
            '/assets/projects/tour-de-france/parisroubaix.jpg',
          ],
          mockupUrl: '/assets/projects/tour-de-france/alpe_Dhuez.jpg',
          content:
            'Limited-edition posters capturing the beauty and challenge of iconic mountain passes.',
          tags: ['Print', 'Poster Series'],
          type: 'poster-print',
          layout: 'grid-3',
          order: 15,
          completedDate: 'February 2025',
        },
        {
          title: "Martha's Vineyard Poster Series",
          description:
            'A vintage-inspired collection of maps and posters for Martha’s Vineyard.',
          imageUrl: '/assets/projects/mv/katama-airpark.jpg',
          gallery: [
            '/assets/projects/mv/katama-airpark.jpg',
            '/assets/projects/mv/aquinnah.jpg',
            '/assets/projects/mv/cape-poge.jpg',
            '/assets/projects/mv/corbin-norton.jpg',
            '/assets/projects/mv/flying-horses.jpg',
            '/assets/projects/mv/state-beach.jpg',
          ],
          mockupUrl: '/assets/projects/mv/katama-airpark.jpg',
          content:
            'A comprehensive series of high-quality prints celebrating the unique geography of Martha’s Vineyard.',
          tags: ['Print', 'Graphic Design'],
          type: 'poster-print',
          layout: 'grid-3',
          order: 16,
          completedDate: 'March 2025',
        },
        {
          title: 'New England Ski Resort Poster Series',
          description:
            'Highly detailed topographic maps and posters of New England ski areas.',
          imageUrl: '/assets/projects/ski-maps/killington.png',
          gallery: [
            '/assets/projects/ski-maps/killington.png',
            '/assets/projects/ski-maps/stowe.png',
            '/assets/projects/ski-maps/jay-peak.png',
            '/assets/projects/ski-maps/berkshire-east.png',
            '/assets/projects/ski-maps/sugarbush.png',
            '/assets/projects/ski-maps/stratton.png',
            '/assets/projects/ski-maps/okemo.png',
            '/assets/projects/ski-maps/loon.png',
            '/assets/projects/ski-maps/sunday-river.png',
            '/assets/projects/ski-maps/mount-snow.png',
            '/assets/projects/ski-maps/attitash-bearpeak.png',
            '/assets/projects/ski-maps/bolton-valley.png',
            '/assets/projects/ski-maps/bretton-woods.png',
            '/assets/projects/ski-maps/bromley.png',
            '/assets/projects/ski-maps/burke.png',
            '/assets/projects/ski-maps/cannon.png',
            '/assets/projects/ski-maps/gunstock.png',
            '/assets/projects/ski-maps/mad-river-glen.png',
            '/assets/projects/ski-maps/pats-peak.png',
            '/assets/projects/ski-maps/pico.png',
            '/assets/projects/ski-maps/smuggs.png',
            '/assets/projects/ski-maps/sugarloaf.png',
            '/assets/projects/ski-maps/sunapee.png',
            '/assets/projects/ski-maps/waterville-valley.png',
            '/assets/projects/ski-maps/whiteface.png',
            '/assets/projects/ski-maps/wildcat.png',
          ],
          mockupUrl: '/assets/projects/ski-maps/killington.png',
          content:
            'A series of over 26 unique maps capturing the intricate trail systems of major New England resorts.',
          tags: ['Print', 'Cartography'],
          type: 'poster-print',
          layout: 'grid-2',
          order: 17,
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
          order: 18,
          completedDate: 'April 2025',
        },
        {
          title: 'The Hellhole Gravel Grind',
          description:
            'Aggressive brand identity and apparel for a premiere South Carolina gravel event.',
          imageUrl: '/assets/projects/hellhole/HellHole.jpg',
          gallery: [
            '/assets/projects/hellhole/ccap_insta4.jpg',
            '/assets/projects/hellhole/HellHole.jpg',
            '/assets/projects/hellhole/Hellhole5_T-Shirt_Mockup_Front.jpg',
            '/assets/projects/hellhole/Number6-Tshirt-MockUp.jpg',
            '/assets/projects/hellhole/HellHole-no6.jpg',
            '/assets/projects/hellhole/Hellhole_T-Shirt_FinalGraphic_Back.jpg',
            '/assets/projects/hellhole/Hellhole_T-Shirt_FinalGraphic_Front.jpg',
            '/assets/projects/hellhole/HellHole_6_T-Shirt_Graphic_Back.jpg',
            '/assets/projects/hellhole/HellHole_6_T-Shirt_Graphic.jpg',
          ],
          mockupUrl: '/assets/projects/hellhole/HellHole.jpg',
          content:
            'A "devilish" and high-impact visual identity reflecting the difficulty of the race.',
          tags: ['Print', 'Apparel Design'],
          type: 'poster-print',
          layout: 'grid-2',
          order: 19,
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
