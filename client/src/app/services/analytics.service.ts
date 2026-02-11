import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;
  private sessionIdKey = 'portfolio_session_id';

  constructor() {
    this.initSession();
    this.trackPageViews();
    this.initExitTracking();
    // Track initial load
    this.track(window.location.pathname);
  }

  private initSession() {
    if (!localStorage.getItem(this.sessionIdKey)) {
      const sessionId = Math.random().toString(36).substring(2, 15) + 
                        Math.random().toString(36).substring(2, 15);
      localStorage.setItem(this.sessionIdKey, sessionId);
    }
  }

  private getSessionId(): string {
    return localStorage.getItem(this.sessionIdKey) || '';
  }

  private trackPageViews() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.track(event.urlAfterRedirects);
    });
  }

  private initExitTracking() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.track(window.location.pathname, 'page_exit');
      }
    });
  }

  private track(path: string, eventType: string = 'page_view') {
    // Don't track admin pages to keep analytics clean
    if (path.startsWith('/admin')) {
      return;
    }

    this.http.post(`${this.apiUrl}/analytics/track`, {
      path,
      sessionId: this.getSessionId(),
      referrer: document.referrer || null,
      eventType: eventType
    }).subscribe({
      error: (err) => console.error('Analytics tracking failed', err)
    });
  }

  trackClick(buttonName: string) {
    this.http.post(`${this.apiUrl}/analytics/track`, {
      path: window.location.pathname,
      sessionId: this.getSessionId(),
      eventType: 'click',
      eventData: buttonName
    }).subscribe({
      error: (err) => console.error('Click tracking failed', err)
    });
  }

  getStats() {
    return this.http.get(`${this.apiUrl}/analytics/stats`);
  }
}
