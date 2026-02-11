import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { SeoService } from '../../services/seo';
import { SettingsService, AppSettings } from '../../services/settings.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  private seoService = inject(SeoService);
  private settingsService = inject(SettingsService);
  
  settings = signal<AppSettings | null>(null);

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe({
      next: (data) => {
        this.settings.set(data);
        this.seoService.updateMetaTags({
          title: 'About | ' + data.siteTitle,
          description: data.bioLead,
          url: 'about'
        });
      }
    });
  }
}
