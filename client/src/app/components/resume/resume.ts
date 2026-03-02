import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { SeoService } from '../../services/seo';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
})
export class Resume implements OnInit {
  private seoService = inject(SeoService);
  private analyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Resume',
      description: 'Senior Graphic Designer with 15+ years of experience developing structured brand systems and digital platforms. Strategic visual leadership with 10+ years of frontend expertise.',
      url: 'resume'
    });
  }

  downloadResume() {
    this.analyticsService.trackClick('Download Resume');
    const link = document.createElement('a');
    link.href = '/Michael_Sabatini_Resume.pdf';
    link.download = 'Michael_Sabatini_Resume.pdf';
    link.click();
  }
}
