import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { SeoService } from '../../services/seo';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);
  projects: Project[] = [];
  errorMessage: string | null = null;
  isLoading = true;
  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Projects',
      description: 'Explore a showcase of my latest work, including web applications, design systems, and creative experiments.',
      url: 'projects'
    });

    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        console.log('Fetched projects total:', data.length);
        this.projects = data.filter(p => {
          const type = (p.type || '').toLowerCase();
          const isWeb = type.includes('web');
          
          // Prepend API URL to image paths if they are relative
          if (p.imageUrl && p.imageUrl.startsWith('/assets/')) {
            p.imageUrl = `${this.apiUrl}${p.imageUrl}`;
          }
          if (p.gallery) {
            p.gallery = p.gallery.map(img => img.startsWith('/assets/') ? `${this.apiUrl}${img}` : img);
          }
          if (p.mockupUrl && p.mockupUrl.startsWith('/assets/')) {
            p.mockupUrl = `${this.apiUrl}${p.mockupUrl}`;
          }

          console.log(`Project: ${p.title}, Type: ${p.type}, isWeb: ${isWeb}`);
          return isWeb;
        });
        console.log('Filtered web projects count:', this.projects.length);
        this.errorMessage = null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching projects', err);
        this.errorMessage = `Failed to load projects. Please try again later.`;
        this.isLoading = false;
      }
    });
  }
}
