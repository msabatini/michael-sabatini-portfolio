import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
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
  private seoService = inject(SeoService);
  featuredProjects: Project[] = [];

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      url: '',
      description: 'Portfolio of Michael Sabatini, a Full Stack Developer & Designer specializing in high-performance, accessible, and beautiful web experiences.'
    });

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.featuredProjects = data.slice(0, 2);
      },
      error: (err) => {
        console.error('Error fetching featured projects', err);
      }
    });
  }
}
