import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-description.html',
  styleUrl: './project-description.scss',
})
export class ProjectDescriptionComponent {
  @Input({ required: true }) project!: Project;
  
  activeTab: 'overview' | 'product' | 'build' = 'overview';

  setTab(tab: 'overview' | 'product' | 'build') {
    this.activeTab = tab;
  }
}
