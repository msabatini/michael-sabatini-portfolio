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
}
