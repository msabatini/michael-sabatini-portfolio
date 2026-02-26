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
}
