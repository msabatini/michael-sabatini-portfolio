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
        this.projects = data.filter(p => p.type === 'web');
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
