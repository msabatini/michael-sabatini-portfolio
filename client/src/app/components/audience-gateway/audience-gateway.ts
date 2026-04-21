import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-audience-gateway',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './audience-gateway.html',
  styleUrl: './audience-gateway.scss',
})
export class AudienceGatewayComponent {
  private seoService = inject(SeoService);
  private settingsService = inject(SettingsService);

  constructor() {
    this.settingsService.getSettings().subscribe({
      next: (data) => {
        this.seoService.updateMetaTags({
          title: 'Welcome | ' + data.siteTitle,
          url: '',
          description: 'Choose your path: Hiring for a role or looking for freelance design and development services.'
        });
      }
    });
  }
}
