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
  private trackedScrollDepths = new Set<number>();

  constructor() {
    this.initSession();
    this.trackPageViews();
    this.initExitTracking();
    this.initScrollTracking();
    this.initDownloadTracking();
    // Track initial load
    this.track(window.location.pathname);
  }

  private initScrollTracking() {
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      );

      [25, 50, 75, 100].forEach(depth => {
        if (scrollPercent >= depth && !this.trackedScrollDepths.has(depth)) {
          this.trackedScrollDepths.add(depth);
          this.track(window.location.pathname, 'scroll_depth', depth.toString());
        }
      });
    });
  }

  private initDownloadTracking() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href) {
        const url = anchor.href.toLowerCase();
        const extensions = ['.pdf', '.zip', '.doc', '.docx', '.csv'];
        if (extensions.some(ext => url.endsWith(ext))) {
          this.track(window.location.pathname, 'download', anchor.getAttribute('download') || url.split('/').pop());
        }
      }
    });
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
      this.trackedScrollDepths.clear();
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

  private track(path: string, eventType: string = 'page_view', eventData?: string) {
    // Don't track admin pages to keep analytics clean
    if (path.startsWith('/admin')) {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    this.http.post(`${this.apiUrl}/analytics/track`, {
      path,
      sessionId: this.getSessionId(),
      referrer: document.referrer || null,
      eventType: eventType,
      eventData: eventData,
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign')
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

  getStats(start?: string, end?: string, filters: any = {}) {
    let url = `${this.apiUrl}/analytics/stats?`;
    if (start) url += `start=${start}&`;
    if (end) url += `end=${end}&`;
    if (filters.device) url += `device=${filters.device}&`;
    if (filters.campaign) url += `campaign=${filters.campaign}&`;
    if (filters.path) url += `path=${filters.path}&`;
    
    return this.http.get(url);
  }
}
