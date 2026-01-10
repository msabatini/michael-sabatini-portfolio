import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
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
  projects: Project[] = [];
  errorMessage: string | null = null;
  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error fetching projects', err);
        this.errorMessage = `Failed to load projects. Please try again later.`;
      }
    });
  }
}
