import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { SeoService } from '../../services/seo';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';
import { Carousel } from '../carousel/carousel';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon, Carousel],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);
  project: Project | null = null;
  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectService.getProject(+id).subscribe({
          next: (data) => {
            if (!data) {
              this.router.navigate(['/404'], { skipLocationChange: true });
              return;
            }
            
            // Prepend API URL to image paths if they are relative
            if (data.imageUrl && data.imageUrl.startsWith('/assets/')) {
              data.imageUrl = `${this.apiUrl}${data.imageUrl}`;
            }
            if (data.gallery) {
              data.gallery = data.gallery.map(img => img.startsWith('/assets/') ? `${this.apiUrl}${img}` : img);
            }
            if (data.mockupUrl && data.mockupUrl.startsWith('/assets/')) {
              data.mockupUrl = `${this.apiUrl}${data.mockupUrl}`;
            }

            this.project = data;
            this.seoService.updateMetaTags({
              title: data.title,
              description: data.description,
              image: this.project.imageUrl,
              url: `projects/${id}`
            });
          },
          error: (err) => {
            console.error('Error fetching project details', err);
            this.router.navigate(['/404'], { skipLocationChange: true });
          }
        });
      }
    });
  }
}
