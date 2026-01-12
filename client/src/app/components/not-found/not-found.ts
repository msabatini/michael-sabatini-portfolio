import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Icon } from '../icon/icon';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {
  private seoService = inject(SeoService);

  constructor() {
    this.seoService.updateMetaTags({
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.'
    });
  }
}
