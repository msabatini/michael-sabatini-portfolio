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
  
  projects = signal<Project[]>([]);
  apiUrl = 'http://127.0.0.1:3000';

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Print & Graphic Design',
      description: 'Explore my graphic design portfolio, featuring branding, editorial layouts, and print media projects.',
      url: 'print'
    });

    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjectsByType('print').subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Error fetching print projects', err)
    });
  }
}
