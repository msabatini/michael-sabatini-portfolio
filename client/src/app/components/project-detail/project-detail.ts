import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { SeoService } from '../../services/seo';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';
import { Carousel } from '../carousel/carousel';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon, Carousel],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);
  project: Project | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProject(+id).subscribe({
        next: (data) => {
          this.project = data;
          this.seoService.updateMetaTags({
            title: data.title,
            description: data.description,
            image: data.imageUrl,
            url: `projects/${id}`
          });
        },
        error: (err) => {
          console.error('Error fetching project details', err);
        }
      });
    }
  }
}
