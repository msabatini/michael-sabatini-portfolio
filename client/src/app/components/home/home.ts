import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { SettingsService, AppSettings } from '../../services/settings.service';
import { SeoService } from '../../services/seo';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Icon],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private projectService = inject(ProjectService);
  private settingsService = inject(SettingsService);
  private seoService = inject(SeoService);
  
  featuredProjects: Project[] = [];
  settings = signal<AppSettings | null>(null);

  displayName = computed(() => {
    const title = this.settings()?.siteTitle;
    if (!title) return 'Michael Sabatini';
    return title.split('|')[0].trim();
  });

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe({
      next: (data) => {
        this.settings.set(data);
        this.seoService.updateMetaTags({
          title: data.siteTitle,
          url: '',
          description: data.heroSubtitle
        });
      }
    });

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.featuredProjects = data.filter(p => p.isFeatured);
        if (this.featuredProjects.length === 0) {
          this.featuredProjects = data.slice(0, 2);
        }
      },
      error: (err) => {
        console.error('Error fetching featured projects', err);
      }
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
