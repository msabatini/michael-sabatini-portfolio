import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from './services/theme';
import { AnalyticsService } from './services/analytics.service';
import { Icon } from './components/icon/icon';
import { BackToTop } from './components/back-to-top/back-to-top';
import { AdminAccess } from './components/admin-access/admin-access';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon, BackToTop, AdminAccess],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Portfolio');
  protected readonly themeService = inject(ThemeService);
  protected readonly analyticsService = inject(AnalyticsService);
  protected readonly router = inject(Router);
  protected readonly isMenuOpen = signal(false);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
      this.closeMenu();
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  trackClick(name: string) {
    this.analyticsService.trackClick(name);
  }
}
