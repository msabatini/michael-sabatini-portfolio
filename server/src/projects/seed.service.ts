import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly projectsService: ProjectsService) {}

  async onModuleInit() {
    const projects = await this.projectsService.findAll();
    const initialProjects = [
      {
        title: 'Sorella Home Solutions',
        description: 'Sophisticated corporate website for a premium home concierge service company.',
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
          '/assets/projects/sorella/sorella-case-study8.jpg'
          
        ],
        mockupUrl: '/assets/projects/sorella/sorella-mockup.jpg',
        content: 'Developed a professional digital presence for a premium home concierge service, establishing their brand and laying the groundwork for a comprehensive client portal system.',
        tags: ['HTML5', 'SCSS', 'JavaScript', 'UI/UX Design', 'Mobile First'],
        challenge: 'Sorella Home Solutions needed a digital presence that reflected their premium service quality across property management, project oversight, and corporate relocation. The site had to be scalable enough to serve as the foundation for a Phase 2 client portal.',
        solution: 'I created a modern, responsive mobile-first website utilizing advanced SCSS for styling and interactive JavaScript for smooth functionality. The architecture was built with future scalability in mind, preparing the system for backend database integration and API gateways.',
        result: 'Launched within 1 month with 100% client satisfaction, successfully establishing a premium brand position and completing all Phase 2 readiness requirements.',
      },
      {
        title: 'Clinical Resources SLP Platform',
        description: 'Revolutionary digital assessment platform for speech-language pathologists.',
        imageUrl: '/assets/projects/clinical/cr-hero.jpg',
        gallery: [
          '/assets/projects/clinical/cr-hero.jpg',
          '/assets/projects/clinical/cr-main.jpg',
          '/assets/projects/clinical/cr-hook-chart.jpg',
          '/assets/projects/clinical/cr-dashboard.jpg',
          '/assets/projects/clinical/cr-report-modal.jpg',
          '/assets/projects/clinical/cr-contact-form.jpg',
          '/assets/projects/clinical/cr-mobile-1.jpg',
          '/assets/projects/clinical/cr-mobile-2.jpg'
        ],
        mockupUrl: '/assets/projects/clinical/clinical-mockup.jpg',
        content: 'An evidence-based platform designed to empower pathologists with digital tools for clinical assessments, featuring the industry\'s first interactive Hook Chart.',
        tags: ['Angular', 'TypeScript', 'Node.js', 'Sass', 'Clinical Tech'],
        challenge: 'Transforming complex, paper-based assessment visualization systems (like the Hook Chart) into an interactive digital experience. The system needed to handle dynamic performance scaling and color-coded results across multiple test types like BRIEF, CTOPP, and WISC-V.',
        solution: 'Built a high-performance Angular application featuring the groundbreaking digital Hook Chart. Integrated a comprehensive reporting system with instant preview, PDF generation, and CSV exports for comparison summaries across 50+ language assessments.',
        result: 'Delivered the industry\'s first digital Hook Chart within a 1-month development cycle, providing revolutionary SLP innovation with 6 categories of performance scales.',
      },
      {
        title: 'SOFFRA Climbing Platform',
        description: 'Global social media platform for cyclists and mountain climbing enthusiasts.',
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
          '/assets/projects/soffra/climb-atlas-world.png'
        ],
        mockupUrl: '/assets/projects/soffra/soffra-mockup.jpg',
        content: 'A comprehensive SaaS platform focused on global mountain climbing segments, featuring advanced mapping, real-time rankings, and community engagement tools.',
        tags: ['Angular', 'Node.js', 'MongoDB', 'Google Maps API', 'Stripe', 'DevOps'],
        challenge: 'Managing and visualizing massive amounts of global climbing data, including 6,000+ segments across 22 countries. The platform required complex ranking systems, interactive vector maps (ClimbAtlas), and seamless payment processing.',
        solution: 'Developed a full-stack MEAN application featuring a Stripe-integrated payment gateway and an interactive ClimbAtlas. I implemented Google Maps integration for segment tracking, elevation charts for effort visualization, and a scalable DevOps strategy for global deployment.',
        result: 'Successfully mapped 6,199 segments across 22 countries, tracking over 4.8 million meters of elevation and reaching launch readiness for Spring 2026.',
      },
      {
        title: 'Flourrish Environmental Funding',
        description: 'Global crowdsourcing platform for funding environmental restoration and conservation projects.',
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
          '/assets/projects/flourrish/flourrish-case-study10.jpg'
        ],
        mockupUrl: '/assets/projects/flourrish/flourrish-mockup.jpg',
        content: 'Flourrish is a revolutionary environmental fintech platform that bridges the gap between conservation projects and global funding. By crowdsourcing donations from individual, private, and public entities, it provides a transparent and efficient way to fund high-impact environmental initiatives worldwide.',
        tags: ['Angular', 'Node.js', 'PostgreSQL', 'Stripe', 'D3.js', 'FinTech', 'Sustainability'],
        challenge: 'Creating a secure, transparent, and scalable platform that could handle multi-currency donations and complex fund distribution across diverse global jurisdictions. The system needed to provide real-time impact tracking and verifiable reporting for both individual donors and institutional partners.',
        solution: 'I developed a robust full-stack architecture featuring a Stripe-integrated payment gateway for multi-entity contributions. I implemented an interactive impact map using D3.js and Google Maps to visualize project progress, and built a comprehensive analytics dashboard for tracking donation flows and environmental ROI.',
        result: 'Delivered a production-ready platform capable of supporting thousands of simultaneous transactions, featuring a verifiable audit trail for every dollar donated and establishing a new standard for transparency in environmental crowdsourcing.',
      },
      {
        title: 'Pixlhaus Internet Technologies',
        description: 'Full-service digital agency specializing in high-performance web, mobile, and e-commerce solutions.',
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
          '/assets/projects/pixlhaus/pixlhaus-case-study14.jpg'
        ],
        mockupUrl: '/assets/projects/pixlhaus/pixlhaus-mockup.jpg',
        content: 'Pixlhaus is a comprehensive digital agency that delivers pixel-perfect websites, intuitive user interfaces, and robust backend systems. It bridges the gap between creative design thinking and technical expertise to bring complex digital visions to life.',
        tags: ['React', 'Angular', 'Vue.js', 'Node.js', 'Shopify', 'UI/UX Design', 'Full-Stack'],
        challenge: 'Businesses often struggle with fragmented digital strategies and non-scalable solutions. They need a unified partner to handle everything from brand identity to complex system architecture with a focus on performance and security.',
        solution: 'Provided a comprehensive "Design & Build" approach, leveraging cutting-edge technologies and enterprise-grade security. Implemented lightning-fast performance optimizations and responsive designs that work flawlessly across all devices.',
        result: 'Successfully established a premium market position, delivering scalable solutions that grow with client businesses while maintaining 24/7 uptime through proactive maintenance plans.',
      },
    ];

    for (const projectData of initialProjects) {
      const existingProject = projects.find(p => p.title === projectData.title);
      
      if (!existingProject) {
        await this.projectsService.create(projectData);
        console.log(`Added new project: ${projectData.title}`);
      } else {
        // Update existing project with any new fields (like mockupUrl)
        await this.projectsService.update(existingProject.id, projectData);
        console.log(`Updated project: ${projectData.title}`);
      }
    }
  }
}
