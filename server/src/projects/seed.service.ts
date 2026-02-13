import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly projectsService: ProjectsService) {}

  async onModuleInit() {
    console.log('Seeding projects...');
    await this.projectsService.clearAll();
    console.log('Cleared existing projects.');

    const initialProjects = [
      {
        title: 'Hub Bicycle',
        description:
          'Modern brand identity and signage for an urban bicycle boutique.',
        imageUrl: '/assets/projects/hub-bicycle/Postcard-Mock-up.jpg',
        gallery: [
          '/assets/projects/hub-bicycle/Postcard-Mock-up.jpg',
          '/assets/projects/hub-bicycle/hub_bizcard.png',
          '/assets/projects/hub-bicycle/hub-index.png',
          '/assets/projects/hub-bicycle/hub-about.png',
          '/assets/projects/hub-bicycle/hub-equipment.png',
          '/assets/projects/hub-bicycle/hub-service.png',
          '/assets/projects/hub-bicycle/hub-icons.png',
          '/assets/projects/hub-bicycle/hubbicycle_hangtag_front.jpg',
          '/assets/projects/hub-bicycle/hubbicycle_hangtag_back.jpg',
        ],
        mockupUrl: '/assets/projects/hub-bicycle/Postcard-Mock-up.jpg',
        content:
          'Hub Bicycle is a community-focused bike shop specializing in urban commuting and custom builds. The branding project centered on creating a high-energy, kinetic visual language that reflects the movement and precision of cycling.',
        tags: ['Branding', 'Print', 'Signage'],
        type: 'print',
        challenge:
          'The brand needed to appeal to both hardcore cycling enthusiasts and casual commuters. The visual identity had to be scalable from small parts packaging to large-scale storefront signage.',
        solution:
          'I designed a modular logo system based on the geometry of a bicycle hub. The typography is bold and forward-leaning, paired with a vibrant safety-orange and charcoal palette. This ensures high visibility and immediate brand recognition in an urban environment.',
        result:
          'The new identity successfully unified the shop’s physical and digital presence. The custom signage has become a local landmark, significantly increasing foot traffic and establishing Hub Bicycle as a premier destination for city cyclists.',
        designSpecs: [
          { label: 'Primary Color', value: '#FF5733', type: 'color' },
          { label: 'Secondary Color', value: '#333333', type: 'color' },
          { label: 'Typography', value: 'Industrial Sans-Serif', type: 'text' },
          { label: 'Signage Material', value: 'Powder-Coated Steel', type: 'text' },
        ],
        completedDate: 'February 2026',
      },
      {
        title: 'Farmland Consulting',
        description:
          'Comprehensive brand identity and stationery design for a specialized agricultural consultancy.',
        imageUrl: '/assets/projects/farmland/FarmlandConsulting_StationaryMockup.jpg',
        gallery: [
          '/assets/projects/farmland/FarmlandConsulting_StationaryMockup.jpg',
          '/assets/projects/farmland/Farmland_Letterhead_folder.png',
          '/assets/projects/farmland/Farmland_Letterhead.png',
          '/assets/projects/farmland/FarmlandConsulting_businesscard-front.png',
          '/assets/projects/farmland/FarmlandConsulting_businesscard-back.png',
          '/assets/projects/farmland/FarmlandConsulting_envelope.png',
          '/assets/projects/farmland/business_card_mockup.jpg',
          '/assets/projects/farmland/FarmlandConsulting_seal_Final.png',
        ],
        mockupUrl: '/assets/projects/farmland/FarmlandConsulting_StationaryMockup.jpg',
        content:
          'Farmland Consulting provides expert advisory services to the agricultural sector. The branding project focused on creating a professional, trustworthy, and modern identity that resonates with both traditional farmers and corporate agribusiness stakeholders.',
        tags: ['Branding', 'Print', 'Identity'],
        type: 'print',
        challenge:
          'The challenge was to create a visual identity that felt grounded in agricultural heritage while appearing sophisticated enough for high-level consulting. The brand needed to work across diverse applications, from digital headers to high-quality print stationery.',
        solution:
          'I developed a clean, minimalist logo featuring a stylized seal that evokes authority and growth. The color palette uses deep greens and earthy tones, paired with modern typography to balance tradition with innovation. The resulting stationery suite includes business cards, letterheads, and folders that project professional excellence.',
        result:
          'The final brand identity successfully positioned Farmland Consulting as a leader in their field. The cohesive stationery suite has been praised for its high-production value and has helped the client secure significant new advisory contracts.',
        designSpecs: [
          { label: 'Primary Color', value: '#2D5A27', type: 'color' },
          { label: 'Secondary Color', value: '#F5F5F0', type: 'color' },
          {
            label: 'Typography',
            value: 'Serif & Sans-Serif Mix',
            type: 'text',
          },
          {
            label: 'Print Stock',
            value: '120gsm Uncoated Premium',
            type: 'text',
          },
        ],
        completedDate: 'January 2026',
      },
      {
        title: 'Pinnacle Solutions',
        description:
          'High-end corporate branding and digital presence for a global technology solutions provider.',
        imageUrl: '/assets/projects/pinnacle-solutions/pinnacle-biz-card-mockup.jpg',
        gallery: [
          '/assets/projects/pinnacle-solutions/pinnacle_logo.jpg',
          '/assets/projects/pinnacle-solutions/pinnacle-biz-card-mockup.jpg',
          '/assets/projects/pinnacle-solutions/pinnacle-bizcard-mockup-back-white.jpg',
          '/assets/projects/pinnacle-solutions/pinnacle-bizcard-mockup-front-white.jpg',
          '/assets/projects/pinnacle-solutions/pinnacle-bizcard-mockup-front.jpg',
          '/assets/projects/pinnacle-solutions/pinnacle-bizcard-mockup.jpg',
          '/assets/projects/pinnacle-solutions/pinnacle-website-mockup.jpg',
        ],
        mockupUrl: '/assets/projects/pinnacle-solutions/pinnacle-website-mockup.jpg',
        content:
          'Pinnacle Solutions is a leading provider of enterprise-grade technology and consulting services. This project involved a complete brand overhaul, focusing on a clean, powerful aesthetic that reflects their commitment to innovation and peak performance.',
        tags: ['Branding', 'Print', 'Graphic Design'],
        type: 'print',
        challenge:
          'The existing brand felt outdated and failed to communicate the scale and sophistication of the company’s services. Pinnacle needed a visual identity that would stand out in a crowded global market while remaining professional and approachable.',
        solution:
          'I created a bold, geometric logo and a refined color palette of deep blue and metallic silver. The new branding was applied across a full suite of corporate materials, including high-end business cards and a modern, responsive website mockup that emphasizes clarity and impact.',
        result:
          'The rebranded Pinnacle Solutions has seen a significant increase in lead generation and client confidence. The cohesive visual language has strengthened their market position, helping them secure several multi-million dollar contracts in the tech sector.',
        designSpecs: [
          { label: 'Primary Color', value: '#003366', type: 'color' },
          { label: 'Secondary Color', value: '#C0C0C0', type: 'color' },
          { label: 'Typography', value: 'Modern Geometric Sans', type: 'text' },
          { label: 'Print Detail', value: 'Spot UV & Matte Laminate', type: 'text' },
        ],
        completedDate: 'March 2026',
      },
      {
        title: 'Apparent Insurance',
        description:
          'Modern digital experience and brand system for a customer-centric insurance provider.',
        imageUrl: '/assets/projects/apparent-insurance/APPARENTINSURANCE_RETRIEVE_MOCKUP.jpg',
        gallery: [
          '/assets/projects/apparent-insurance/apparent-logo.jpg',
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
        mockupUrl: '/assets/projects/apparent-insurance/APPARENTINSURANCE_RETRIEVE_MOCKUP.jpg',
        content:
          'Apparent Insurance focuses on providing clear, transparent, and family-oriented insurance solutions. The project involved creating a cohesive visual language that simplifies complex insurance information and builds user trust through a clean, modern aesthetic.',
        tags: ['Branding', 'UI/UX', 'Digital Identity'],
        type: 'print',
        challenge:
          'The insurance industry often feels opaque and intimidating. Apparent needed a brand that felt approachable and reliable, with a digital-first approach that could translate seamlessly into high-end printed collateral.',
        solution:
          'I developed a soft yet professional color palette and a typography system centered on readability. The visual assets emphasize clarity and ease of use, using a modular design system that works effectively across both web platforms and printed marketing materials.',
        result:
          'The new brand identity and digital mockups successfully communicated Apparent’s core values of transparency and simplicity. The cohesive system provided a strong foundation for their market launch and has been instrumental in establishing their presence in a competitive landscape.',
        designSpecs: [
          { label: 'Primary Color', value: '#2C3E50', type: 'color' },
          { label: 'Secondary Color', value: '#E74C3C', type: 'color' },
          { label: 'Typography', value: 'Clean Humanist Sans', type: 'text' },
          { label: 'Key Feature', value: 'High-Contrast Clarity', type: 'text' },
        ],
        completedDate: 'April 2026',
      },
      {
        title: 'Progressive Insurance',
        description:
          'Streamlined digital quoting experience and visual systems for a leading national insurer.',
        imageUrl: '/assets/projects/progressive-insurance/1.jpg',
        gallery: [
          '/assets/projects/progressive-insurance/1.jpg',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-21_at_9.47.55_AM_copy.png',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-20_at_10.12.58_AM_copy.png',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-20_at_10.26.32_AM_copy.png',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-20_at_10.37.05_AM_copy.png',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-20_at_10.45.50_AM_copy.png',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-20_at_10.47.13_AM_copy.png',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-20_at_10.56.14_AM_copy.png',
          '/assets/projects/progressive-insurance/Screen_Shot_2018-09-20_at_10.58.29_AM_copy.png',
        ],
        mockupUrl: '/assets/projects/progressive-insurance/1.jpg',
        content:
          'Progressive Insurance required a modern, user-centric approach to their digital quoting and customer engagement platforms. This project focused on creating a seamless, intuitive interface that simplifies the insurance process while maintaining a strong, recognizable brand identity across all touchpoints.',
        tags: ['UI/UX Design', 'Branding', 'Digital Strategy'],
        type: 'print',
        challenge:
          'Designing for a large-scale insurance provider involves balancing complex data entry requirements with a need for speed and clarity. The goal was to reduce user friction during the quoting process while ensuring that the brand’s friendly and reliable persona remained consistent.',
        solution:
          'I implemented a modular design system that prioritizes clarity and efficiency. By focusing on clean typography, intuitive navigation, and high-impact visual cues, I developed a series of mockups that demonstrate a more streamlined and approachable insurance experience, suitable for both digital and high-quality print presentations.',
        result:
          'The resulting design systems provided a clear path for digital transformation, enhancing the overall customer journey. The cohesive visual language has been praised for its ability to demystify complex information, leading to improved user confidence and brand loyalty.',
        designSpecs: [
          { label: 'Primary Color', value: '#00529B', type: 'color' },
          { label: 'Secondary Color', value: '#FFFFFF', type: 'color' },
          { label: 'Typography', value: 'Frutiger Sans-Serif', type: 'text' },
          { label: 'Key Goal', value: 'Quoting Optimization', type: 'text' },
        ],
        completedDate: 'May 2026',
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
          'Movement Insurance is built on the philosophy of constant evolution and user-centricity. The branding and UI/UX project focused on creating a high-energy, kinetic visual language that reflects the "movement" of the brand and the fluidity of modern insurance needs.',
        tags: ['Branding', 'UI/UX Design', 'Digital Identity'],
        type: 'print',
        challenge:
          'The brand needed to appeal to a younger, more tech-savvy demographic that finds traditional insurance stagnant. The challenge was to create a visual identity that felt fast-paced and innovative while maintaining the trust and reliability essential to the insurance sector.',
        solution:
          'I developed a bold, modern brand system with a vibrant color palette and kinetic typography. The digital mockups feature a streamlined, "mobile-first" quoting experience that minimizes friction and maximizes engagement. The resulting design system is highly scalable, working effectively across all digital platforms and printed marketing collateral.',
        result:
          'The new identity successfully positioned Movement Insurance as a major disruptor in the market. The intuitive UI/UX design has significantly reduced bounce rates in the quoting funnel and has established a strong, memorable brand presence that resonates with the target audience.',
        designSpecs: [
          { label: 'Primary Color', value: '#3498DB', type: 'color' },
          { label: 'Secondary Color', value: '#2ECC71', type: 'color' },
          { label: 'Typography', value: 'Modern Geometric Sans', type: 'text' },
          { label: 'Core Vibe', value: 'Disruptive & Kinetic', type: 'text' },
        ],
        completedDate: 'June 2026',
      },
      {
        title: 'Homesite Home Insurance',
        description:
          'Comprehensive digital insurance platform redesign focusing on user-centric home protection.',
        imageUrl: '/assets/projects/homesite-insurance/1.jpg',
        gallery: [
          '/assets/projects/homesite-insurance/1.jpg',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_1.56.03_PM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_10.53.55_AM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_10.54.50_AM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_10.56.14_AM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_10.58.39_AM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_10.59.53_AM.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_11.00.41_AM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_11.01.47_AM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_11.02.58_AM_copy.png',
          '/assets/projects/homesite-insurance/Screen_Shot_2018-09-14_at_11.05.23_AM_copy.png',
        ],
        mockupUrl: '/assets/projects/homesite-insurance/1.jpg',
        content:
          'Homesite Insurance required a complete digital transformation of their home insurance quoting engine. The goal was to simplify the complex data requirements of home insurance into a manageable, intuitive, and trustworthy digital experience.',
        tags: ['UI/UX Design', 'Digital Product', 'Insurance Tech'],
        type: 'print',
        challenge:
          'Home insurance quotes involve deep data points ranging from roof age to plumbing materials. The challenge was to keep the user engaged throughout a lengthy form while maintaining a clean, professional aesthetic that projects stability and reliability.',
        solution:
          'I designed a multi-step journey that breaks down complex questions into logical clusters. By using progressive disclosure and helpful visual tooltips, I made the process feel less overwhelming. The visual language uses a calm, trustworthy blue and green palette, with high-quality mockups that demonstrate a premium digital experience across all devices.',
        result:
          'The redesigned flow significantly reduced drop-off rates and improved user completion speed. The project established a new benchmark for Homesite’s digital offerings, unifying their brand across the web and high-end marketing presentations.',
        designSpecs: [
          { label: 'Primary Color', value: '#1A5276', type: 'color' },
          { label: 'Secondary Color', value: '#D4E6F1', type: 'color' },
          { label: 'Typography', value: 'Roboto & Open Sans', type: 'text' },
          { label: 'Focus', value: 'User Trust & Simplicity', type: 'text' },
        ],
        completedDate: 'July 2026',
      },
      {
        title: 'Electric Insurance',
        description:
          'Modern brand system and digital interface for a premier personal and commercial insurer.',
        imageUrl: '/assets/projects/electric-insurance/1.jpg',
        gallery: [
          '/assets/projects/electric-insurance/1.jpg',
          '/assets/projects/electric-insurance/Electric-About-Desktop_copy.jpg',
          '/assets/projects/electric-insurance/Electric-AddInfo-Desktop_copy.jpg',
          '/assets/projects/electric-insurance/Electric-Coverage-Desktop_copy.jpg',
          '/assets/projects/electric-insurance/Electric-Exterior-Desktop_copy.jpg',
          '/assets/projects/electric-insurance/Electric-Interior-Desktop_copy.jpg',
        ],
        mockupUrl: '/assets/projects/electric-insurance/1.jpg',
        content:
          'Electric Insurance provides specialized personal and commercial insurance solutions. This project involved a comprehensive visual overhaul of their digital quote-to-bind experience, focusing on high-end performance, clarity, and brand consistency across complex user journeys.',
        tags: ['UI/UX Design', 'Branding', 'Digital Identity'],
        type: 'print',
        challenge:
          'The existing digital experience felt fragmented and lacked the premium feel required for their high-net-worth client base. The challenge was to create a unified design system that could handle intricate commercial data while remaining approachable for individual policyholders.',
        solution:
          'I developed a sophisticated visual identity centered on a refined color palette and professional typography. The digital mockups showcase a high-performance quoting engine with an emphasis on mobile responsiveness and clean data visualization. The final assets deliver a premium, seamless experience that elevates the brand above traditional competitors.',
        result:
          'The new design system established Electric Insurance as a digital leader in their niche. The cohesive mockups have been instrumental in internal stakeholder buy-in for a full platform rebuild and have successfully unified their brand presence across multiple digital channels.',
        designSpecs: [
          { label: 'Primary Color', value: '#F1C40F', type: 'color' },
          { label: 'Secondary Color', value: '#2C3E50', type: 'color' },
          { label: 'Typography', value: 'Geometric Sans-Serif', type: 'text' },
          { label: 'Key Attribute', value: 'High-Performance UI', type: 'text' },
        ],
        completedDate: 'August 2026',
      },
      {
        title: 'Sorella Home Solutions',
        description:
          'Sophisticated corporate website for a premium home concierge service company.',
        imageUrl: '/assets/projects/sorella/sorella-case-study10.jpg',
        gallery: [
          '/assets/projects/sorella/sorella-case-study10.jpg',
          '/assets/projects/sorella/sorella-case-study1.jpg',
          '/assets/projects/sorella/sorella-case-study9.jpg',
          '/assets/projects/sorella/sorella-case-study2.jpg',
          '/assets/projects/sorella/sorella-case-study3.jpg',
          '/assets/projects/sorella/sorella-case-study4.jpg',
          '/assets/projects/sorella/sorella-case-study5.jpg',
          '/assets/projects/sorella/sorella-case-study6.jpg',
          '/assets/projects/sorella/sorella-case-study7.jpg',
          '/assets/projects/sorella/sorella-case-study8.jpg',
        ],
        mockupUrl: '/assets/projects/sorella/sorella-mockup.jpg',
        content:
          'Developed a professional digital presence for a premium home concierge service, establishing their brand and laying the groundwork for a comprehensive client portal system.',
        tags: ['HTML5', 'SCSS', 'JavaScript', 'UI/UX Design', 'Mobile First'],
        type: 'web',
        challenge:
          'Sorella Home Solutions required a sophisticated digital presence to reflect their premium concierge services while needing a robust platform for content engagement. The primary challenge was building a scalable infrastructure that could support a high-end brand aesthetic while providing powerful, user-friendly tools for long-term content management and SEO growth.',
        solution:
          'I engineered a high-performance, mobile-first website integrated with a bespoke blog and a comprehensive CMS management dashboard. This custom backend allows the team to post and delete content, mediate community comments, and manage granular SEO settings. To ensure seamless adoption, I also developed a full Help Guide documentation system within the dashboard for the Sorella team.',
        result:
          'Successfully launched a complete digital ecosystem including the primary brand site, blog, and custom management backend. The project achieved 100% client satisfaction, empowering the Sorella team to independently manage their digital growth, SEO strategy, and community engagement through a purpose-built administrative dashboard.',
        completedDate: 'September 2025',
      },
      {
        title: 'Clinical Resources SLP Platform',
        description:
          'Revolutionary digital assessment platform for speech-language pathologists.',
        imageUrl: '/assets/projects/clinical/cr-hero.jpg',
        gallery: [
          '/assets/projects/clinical/cr-hero.jpg',
          '/assets/projects/clinical/cr-main.jpg',
          '/assets/projects/clinical/cr-hook-chart.jpg',
          '/assets/projects/clinical/cr-dashboard.jpg',
          '/assets/projects/clinical/cr-report-modal.jpg',
          '/assets/projects/clinical/cr-contact-form.jpg',
          '/assets/projects/clinical/v2/cr-v2-1.png',
          '/assets/projects/clinical/v2/cr-v2-2.png',
          '/assets/projects/clinical/v2/cr-v2-3.png',
          '/assets/projects/clinical/v2/cr-v2-4.png',
          '/assets/projects/clinical/v2/cr-v2-5.png',
          '/assets/projects/clinical/v2/cr-v2-6.png',
          '/assets/projects/clinical/v2/cr-v2-7.png',
          '/assets/projects/clinical/v2/cr-v2-8.png',
          '/assets/projects/clinical/v2/cr-v2-9.png',
          '/assets/projects/clinical/v2/cr-v2-10.png',
          '/assets/projects/clinical/v2/cr-v2-11.png',
          '/assets/projects/clinical/v2/cr-v2-12.png',
          '/assets/projects/clinical/v2/cr-v2-13.png',
          '/assets/projects/clinical/v2/cr-v2-14.png',
          '/assets/projects/clinical/v2/cr-v2-15.png',
          '/assets/projects/clinical/v2/cr-v2-16.png',
        ],
        mockupUrl: '/assets/projects/clinical/clinical-mockup.jpg',
        content:
          "An evidence-based platform designed to empower pathologists with digital tools for clinical assessments, featuring the industry's first interactive Hook Chart.",
        tags: ['Angular', 'TypeScript', 'Node.js', 'Sass', 'Clinical Tech'],
        type: 'web',
        challenge:
          'Transforming complex, paper-based assessment visualization systems (like the Hook Chart) into an interactive digital experience. The system needed to handle dynamic performance scaling and color-coded results across multiple test types like BRIEF, CTOPP, and WISC-V. Additionally, the client required a full analytics dashboard to track user engagement and platform usage.',
        solution:
          'Built a high-performance Angular application featuring the groundbreaking digital Hook Chart. Integrated a comprehensive reporting system with instant preview, PDF generation, and CSV exports for comparison summaries across 50+ language assessments. I also implemented a full analytics dashboard to track user engagement and platform activity.',
        result:
          "Delivered the industry's first digital Hook Chart and a full analytics engagement dashboard within a 1-month development cycle, providing revolutionary SLP innovation with 6 categories of performance scales.",
        completedDate: 'August 2025',
      },
      {
        title: 'SOFFRA Climbing Platform',
        description:
          'Global social media platform for cyclists and mountain climbing enthusiasts.',
        imageUrl: '/assets/projects/soffra/soffra-main-hero.jpg',
        gallery: [
          '/assets/projects/soffra/soffra-main-hero.jpg',
          '/assets/projects/soffra/climbatlas-computer-mockup.png',
          '/assets/projects/soffra/climb-atlas-24-forecast.png',
          '/assets/projects/soffra/climb-atlas-climb-cards-perspective.png',
          '/assets/projects/soffra/climb-atlas-climb-cards.png',
          '/assets/projects/soffra/climb-atlas-climb-list.png',
          '/assets/projects/soffra/climb-atlas-climb-page-map-perspective.png',
          '/assets/projects/soffra/climb-atlas-climb-page-map.png',
          '/assets/projects/soffra/climb-atlas-climb-page-top-perspective.png',
          '/assets/projects/soffra/climb-atlas-climb-page-top.png',
          '/assets/projects/soffra/climb-atlas-climb-page.png',
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
          'A comprehensive SaaS platform focused on global mountain climbing segments, featuring advanced mapping, real-time rankings, and community engagement tools.',
        tags: [
          'Angular',
          'Node.js',
          'MongoDB',
          'Google Maps API',
          'Stripe',
          'DevOps',
        ],
        type: 'web',
        challenge:
          'Managing and visualizing massive amounts of global climbing data, including 6,000+ segments across 22 countries. The platform required complex ranking systems, interactive vector maps (ClimbAtlas), and seamless payment processing.',
        solution:
          'Developed a full-stack MEAN application featuring a Stripe-integrated payment gateway and an interactive ClimbAtlas. I implemented Google Maps integration for segment tracking, elevation charts for effort visualization, and a scalable DevOps strategy for global deployment.',
        result:
          'Successfully mapped 6,199 segments across 22 countries, tracking over 4.8 million meters of elevation and reaching launch readiness for Spring 2026.',
        completedDate: 'June 2022',
      },
      {
        title: 'Flourrish Environmental Funding',
        description:
          'Global crowdsourcing platform for funding environmental restoration and conservation projects.',
        imageUrl: '/assets/projects/flourrish/flourrish-case-study9.jpg',
        gallery: [
          '/assets/projects/flourrish/flourrish-case-study9.jpg',
          '/assets/projects/flourrish/flourrish-case-study1.jpg',
          '/assets/projects/flourrish/flourrish-case-study2.jpg',
          '/assets/projects/flourrish/flourrish-case-study3.jpg',
          '/assets/projects/flourrish/flourrish-case-study4.jpg',
          '/assets/projects/flourrish/flourrish-case-study5.jpg',
          '/assets/projects/flourrish/flourrish-case-study6.jpg',
          '/assets/projects/flourrish/flourrish-case-study7.jpg',
          '/assets/projects/flourrish/flourrish-case-study8.jpg',
          '/assets/projects/flourrish/flourrish-case-study10.jpg',
        ],
        mockupUrl: '/assets/projects/flourrish/flourrish-mockup.jpg',
        content:
          'Flourrish is a revolutionary environmental fintech platform that bridges the gap between conservation projects and global funding. By crowdsourcing donations from individual, private, and public entities, it provides a transparent and efficient way to fund high-impact environmental initiatives worldwide.',
        tags: [
          'Angular',
          'Node.js',
          'PostgreSQL',
          'Stripe',
          'D3.js',
          'FinTech',
          'Sustainability',
        ],
        type: 'web',
        challenge:
          'Creating a secure, transparent, and scalable platform that could handle multi-currency donations and complex fund distribution across diverse global jurisdictions. The system needed to provide real-time impact tracking and verifiable reporting for both individual donors and institutional partners.',
        solution:
          'I developed a robust full-stack architecture featuring a Stripe-integrated payment gateway for multi-entity contributions. I implemented an interactive impact map using D3.js and Google Maps to visualize project progress, and built a comprehensive analytics dashboard for tracking donation flows and environmental ROI.',
        result:
          'Delivered a production-ready platform capable of supporting thousands of simultaneous transactions, featuring a verifiable audit trail for every dollar donated and establishing a new standard for transparency in environmental crowdsourcing.',
        completedDate: 'October 2025',
      },
      {
        title: 'Pixlhaus Internet Technologies',
        description:
          'Full-service digital agency specializing in high-performance web, mobile, and e-commerce solutions.',
        imageUrl: '/assets/projects/pixlhaus/pixlhaus-case-study1.jpg',
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
          'Pixlhaus is a comprehensive digital agency that delivers pixel-perfect websites, intuitive user interfaces, and robust backend systems. It bridges the gap between creative design thinking and technical expertise to bring complex digital visions to life.',
        tags: [
          'React',
          'Angular',
          'Vue.js',
          'Node.js',
          'Shopify',
          'UI/UX Design',
          'Full-Stack',
        ],
        type: 'web',
        challenge:
          'Businesses often struggle with fragmented digital strategies and non-scalable solutions. They need a unified partner to handle everything from brand identity to complex system architecture with a focus on performance and security.',
        solution:
          'Provided a comprehensive "Design & Build" approach, leveraging cutting-edge technologies and enterprise-grade security. Implemented lightning-fast performance optimizations and responsive designs that work flawlessly across all devices.',
        result:
          'Successfully established a premium market position, delivering scalable solutions that grow with client businesses while maintaining 24/7 uptime through proactive maintenance plans.',
        completedDate: 'July 2025',
      },
      {
        title: 'Harrison Deller Art',
        description:
          'Harrison Deller acknowledges being a compulsive creator of images forged through intuition and trust in the artistic process and materials; the works do not come from preconceived concepts or ideas and are direct manifestations of the subconscious, which also applies to his poetry writing and music composition.',
        imageUrl: '/assets/projects/harrison-deller-art/harrison-art-2.png',
        gallery: [
          '/assets/projects/harrison-deller-art/harrison-art-2.png',
          '/assets/projects/harrison-deller-art/harrison-art-1.png',
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
          'Harrison Deller is a prolific Paraguayan artist and musician whose multidisciplinary work explores the intersection of visual and auditory expression. As a compulsive creator of images and sound, Harrison requires a digital home that can keep pace with his rapid artistic output, providing a unified space for his subconscious-driven paintings and complex musical compositions.',
        tags: [
          'Angular',
          'Node.js',
          'Custom CMS',
          'Fine Art',
          'Music Streaming',
        ],
        type: 'web',
        challenge:
          'Managing an ever-expanding portfolio of diverse media across multiple disciplines proved difficult with traditional static solutions. Harrison needed a platform that could handle the frequent addition of high-resolution visual art and integrated audio tracks while maintaining a clean, minimalist aesthetic that allows the work to remain the focal point.',
        solution:
          "I developed a bespoke full-stack application featuring a custom-built Content Management System (CMS) tailored specifically to Harrison's workflow. The backend provides an intuitive interface for independently uploading, tagging, and organizing new artwork and music in real-time. The system utilizes optimized image loading and a custom audio player to ensure a high-performance experience.",
        result:
          'The final platform serves as a dynamic, living archive that Harrison manages entirely on his own. By eliminating the technical barrier of manual updates, the custom CMS has empowered the artist to maintain an up-to-the-minute showcase of his career, bridging his Paraguayan roots with his formal training from SCAD and the School of the Art Institute of Chicago.',
        completedDate: 'February 2026',
      },
      {
        title: 'Tour de France Mountain Climb Series',
        description:
          'A stunning poster series celebrating the legendary mountain climbs of the Tour de France.',
        imageUrl:
          '/assets/projects/tour-de-france/tourmalet.jpg',
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
        mockupUrl:
          '/assets/projects/tour-de-france/alpe_Dhuez.jpg',
        content:
          'This series of limited-edition posters captures the raw beauty and grueling challenge of the most iconic mountain passes in professional cycling. Each poster features a minimalist, high-impact design that emphasizes the unique profile and character of climbs like Alpe d’Huez, Mont Ventoux, and the Col du Tourmalet.',
        tags: ['Print', 'Poster Series', 'Cycling'],
        type: 'print',
        layout: 'grid',
        challenge:
          'The goal was to create a cohesive set of visuals that would appeal to cycling enthusiasts and interior design lovers alike. The challenge lay in distilling the complex topography and history of each climb into a clean, modern aesthetic that works across the entire series.',
        solution:
          'I developed a consistent visual framework using bold typography, a refined color palette, and stylized elevation profiles. By focusing on the essential elements of each climb, I created a series that is both informative and artistically compelling, suitable for high-quality framed display.',
        result:
          'The Tour de France Mountain Climb Series has been widely acclaimed by the cycling community and has seen strong sales as a boutique print collection. The cohesive design has made it a popular choice for both individual collectors and cycling-themed commercial spaces.',
        designSpecs: [
          { label: 'Paper Stock', value: '200gsm Archival Matte', type: 'text' },
          { label: 'Print Method', value: 'Giclée Fine Art Print', type: 'text' },
          { label: 'Primary Typography', value: 'Modern Sans-Serif', type: 'text' },
          { label: 'Series Count', value: '10 Unique Posters', type: 'text' },
        ],
        completedDate: 'March 2026',
      },
      {
        title: "Martha's Vineyard Poster Series",
        description:
          "A nostalgic and vibrant poster collection celebrating the unique landmarks of Martha's Vineyard.",
        imageUrl:
          '/assets/projects/marthas-vineyard/state-beach.jpg',
        gallery: [
          '/assets/projects/marthas-vineyard/state-beach.jpg',
          '/assets/projects/marthas-vineyard/aquinnah.jpg',
          '/assets/projects/marthas-vineyard/cape-poge.jpg',
          '/assets/projects/marthas-vineyard/corbin-norton.jpg',
          '/assets/projects/marthas-vineyard/flying-horses.jpg',
          '/assets/projects/marthas-vineyard/Katama-Airpark.jpg',
        ],
        mockupUrl:
          '/assets/projects/marthas-vineyard/state-beach.jpg',
        content:
          "This poster series is a visual tribute to the timeless charm of Martha's Vineyard. From the iconic red cliffs of Aquinnah to the historic Flying Horses Carousel, each piece uses a rich, saturated color palette and vintage-inspired typography to capture the island's unique spirit and coastal heritage.",
        tags: ['Print', 'Poster Series', 'Travel'],
        type: 'print',
        layout: 'grid',
        challenge:
          "The challenge was to create a series that felt cohesive yet distinct, representing the various towns and landmarks of the island. Each poster needed to stand alone as a piece of art while contributing to the overall narrative of a classic Vineyard summer.",
        solution:
          "I designed a unified visual language using textured gradients, bold illustrations, and a consistent typographic system. By selecting iconic vistas and local landmarks, I created a collection that resonates with both year-round residents and seasonal visitors, evocative of classic travel posters from the mid-20th century.",
        result:
          "The series has been extremely well-received, becoming a staple in local galleries and boutiques across the island. The high-quality prints have become sought-after souvenirs and home decor pieces, successfully celebrating the enduring beauty of Martha's Vineyard.",
        designSpecs: [
          { label: 'Paper Stock', value: '250gsm Heavyweight Silk', type: 'text' },
          { label: 'Print Method', value: 'Offset Lithography', type: 'text' },
          { label: 'Typography', value: 'Custom Vintage Serif', type: 'text' },
          { label: 'Dimensions', value: '18" x 24"', type: 'text' },
        ],
        completedDate: 'April 2026',
      },
    ];

    for (const projectData of initialProjects) {
      await this.projectsService.create(projectData);
      console.log(`Added project: ${projectData.title}`);
    }
  }
}
