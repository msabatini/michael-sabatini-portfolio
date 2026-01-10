import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
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
  featuredProjects: Project[] = [];

  ngOnInit(): void {
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
