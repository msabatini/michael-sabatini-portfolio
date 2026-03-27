import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './print.html',
  styleUrl: './print.scss',
})
export class Print implements OnInit {
  private seoService = inject(SeoService);
  private projectService = inject(ProjectService);
  
  standardProjects = signal<Project[]>([]);
  posterProjects = signal<Project[]>([]);
  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Design Portfolio',
      description: 'Explore my design portfolio, featuring branding, editorial layouts, and visual communication projects.',
      url: 'portfolio'
    });

    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        const standard = data.filter(p => {
          const type = (p.type || '').toLowerCase();
          return type === 'print-only' || type === 'print';
        });
        const posters = data.filter(p => {
          const type = (p.type || '').toLowerCase();
          return type === 'poster-print';
        });
        
        this.standardProjects.set(standard);
        this.posterProjects.set(posters);
      },
      error: (err) => console.error('Error fetching print projects', err)
    });
  }

  getKnockoutLogo(title: string): string | null {
    if (!title) return null;
    const lowerTitle = title.toLowerCase();
    
    const mapping: { [key: string]: string } = {
      'clinical': '/assets/projects/knockout-logos/clinical-resources-logo-knockout.png',
      'flourrish': '/assets/projects/knockout-logos/flourrish-logo-knockout.png',
      'pinnacle': '/assets/projects/knockout-logos/pinnacle-logo-knockout.svg',
      'farmland': '/assets/projects/knockout-logos/farmland-consulting-logo-knockout.svg',
      'service course': '/assets/projects/knockout-logos/service-course-knockout.png',
      'sorella': '/assets/projects/knockout-logos/SHS-main-logo-knockout.png',
      'findash': '/assets/projects/knockout-logos/findash-logo-knockout.png',
      'soffra': '/assets/projects/knockout-logos/soffra-logo-knockout.svg'
    };

    if (lowerTitle.includes('soffra')) return mapping['soffra'];
    if (lowerTitle.includes('pinnacle')) return mapping['pinnacle'];
    if (lowerTitle.includes('farmland')) return mapping['farmland'];
    
    for (const key in mapping) {
      if (lowerTitle.includes(key)) return mapping[key];
    }

    return null;
  }

  getLogoClass(title: string): string {
    if (!title) return '';
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('findash')) return 'logo-findash';
    if (lowerTitle.includes('sorella')) return 'logo-sorella';
    if (lowerTitle.includes('service course')) return 'logo-service-course';
    if (lowerTitle.includes('clinical')) return 'logo-clinical';
    return '';
  }
}
