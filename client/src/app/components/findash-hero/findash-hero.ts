import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-findash-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './findash-hero.html',
  styleUrl: './findash-hero.scss',
})
export class FindashHero {
  @Input() project: Project | null = null;
}
