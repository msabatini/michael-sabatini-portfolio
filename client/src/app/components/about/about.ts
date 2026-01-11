import { Component, OnInit, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Icon],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'About',
      description: 'Learn more about Michael Sabatini, a Full Stack Developer & Designer. Discover my journey, skills, and the philosophy behind my work.',
      url: 'about'
    });
  }
}
