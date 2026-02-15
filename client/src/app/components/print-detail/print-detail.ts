import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-print-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './print-detail.html',
  styleUrl: './print-detail.scss',
})
export class PrintDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private projectService = inject(ProjectService);
  apiUrl = environment.apiUrl;
  
  project = signal<Project | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(Number(id));
    }
  }

  loadProject(id: number) {
    this.projectService.getProject(id).subscribe({
      next: (proj) => {
        this.project.set(proj);
        this.seoService.updateMetaTags({
          title: `${proj.title} | Graphic Design`,
          description: proj.description,
          url: `print/${id}`
        });
      },
      error: (err) => console.error('Error loading project', err)
    });
  }
}
