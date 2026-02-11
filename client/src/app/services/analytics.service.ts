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
  private clickHistory: { time: number, x: number, y: number, target: HTMLElement }[] = [];

  constructor() {
    this.initSession();
    this.trackPageViews();
    this.initExitTracking();
    this.initScrollTracking();
    this.initDownloadTracking();
    this.initPerformanceTracking();
    this.initErrorTracking();
    this.initUXTracking();
    // Track initial load
    this.track(window.location.pathname);
  }

  private initUXTracking() {
    document.addEventListener('click', (e) => {
      const x = Math.round(e.pageX);
      const y = Math.round(e.pageY);
      const now = Date.now();
      const target = e.target as HTMLElement;

      // Detect Rage Clicks (3+ clicks within 500ms on same element)
      this.clickHistory.push({ time: now, x, y, target });
      this.clickHistory = this.clickHistory.filter(c => now - c.time < 500);

      const isRage = this.clickHistory.length >= 3;

      // Track 'ux_click' for the heatmap
      this.track(window.location.pathname, 'ux_click', target.tagName, x, y, isRage);
    });
  }

  private initPerformanceTracking() {
    if ('PerformanceObserver' in window) {
      // TTFB & Load Time via Navigation Timing
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        const navEntry = navEntries[0] as any;
        this.track(window.location.pathname, 'perf_ttfb', navEntry.responseStart.toFixed(0));
        this.track(window.location.pathname, 'perf_load_time', navEntry.loadEventEnd.toFixed(0));
      }

      // LCP
      try {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.track(window.location.pathname, 'perf_lcp', lastEntry.startTime.toFixed(0));
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {}

      // CLS
      try {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.track(window.location.pathname, 'perf_cls', clsValue.toFixed(4));
        }).observe({ type: 'layout-shift', buffered: true });
      } catch (e) {}

      // FID
      try {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const fid = entry.duration;
            this.track(window.location.pathname, 'perf_fid', fid.toFixed(0));
          }
        }).observe({ type: 'first-input', buffered: true });
      } catch (e) {}
    }
  }

  private initErrorTracking() {
    window.addEventListener('error', (event) => {
      this.track(window.location.pathname, 'error_js', event.message);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.track(window.location.pathname, 'error_api', event.reason?.message || 'Promise rejection');
    });
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

  private getOS(): string {
    const ua = window.navigator.userAgent;
    if (ua.indexOf('Win') !== -1) return 'Windows';
    if (ua.indexOf('Mac') !== -1) return 'MacOS';
    if (ua.indexOf('Linux') !== -1) return 'Linux';
    if (ua.indexOf('Android') !== -1) return 'Android';
    if (ua.indexOf('like Mac') !== -1) return 'iOS';
    return 'Other';
  }

  private track(
    path: string, 
    eventType: string = 'page_view', 
    eventData?: string, 
    clickX?: number, 
    clickY?: number, 
    isRage?: boolean
  ) {
    // Don't track admin pages to keep analytics clean
    if (path.startsWith('/admin')) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const screenRes = `${window.screen.width}x${window.screen.height}`;

    this.http.post(`${this.apiUrl}/analytics/track`, {
      path,
      sessionId: this.getSessionId(),
      referrer: document.referrer || null,
      eventType: eventType,
      eventData: eventData,
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
      os: this.getOS(),
      screenResolution: screenRes,
      clickX,
      clickY,
      isRageClick: isRage
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
    if (filters.location) url += `location=${filters.location}&`;
    if (filters.compare) url += `compare=true&`;
    
    return this.http.get(url);
  }

  getNotes() {
    return this.http.get(`${this.apiUrl}/analytics/notes`);
  }

  addNote(note: { content: string, date: string, type: string }) {
    return this.http.post(`${this.apiUrl}/analytics/notes`, note);
  }

  deleteNote(id: number) {
    return this.http.post(`${this.apiUrl}/analytics/notes/delete`, { id });
  }

  getShares() {
    return this.http.get(`${this.apiUrl}/analytics/shares`);
  }

  createShare(label?: string, expiresDays?: number) {
    return this.http.post(`${this.apiUrl}/analytics/shares`, { label, expiresDays });
  }

  deleteShare(id: number) {
    return this.http.delete(`${this.apiUrl}/analytics/shares/${id}`);
  }

  getSharedStats(token: string) {
    return this.http.get(`${this.apiUrl}/analytics/shared/${token}`);
  }

  getApiKeys() {
    return this.http.get(`${this.apiUrl}/analytics/keys`);
  }

  createApiKey(label: string) {
    return this.http.post(`${this.apiUrl}/analytics/keys`, { label });
  }

  deleteApiKey(id: number) {
    return this.http.delete(`${this.apiUrl}/analytics/keys/${id}`);
  }
}
