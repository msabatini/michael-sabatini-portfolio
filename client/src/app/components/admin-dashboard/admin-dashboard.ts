import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {
  private router = inject(Router);
  private analyticsService = inject(AnalyticsService);

  stats = signal<any>(null);

  ngOnInit() {
    // Basic session check
    if (!localStorage.getItem('admin_session')) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.loadStats();
  }

  loadStats() {
    this.analyticsService.getStats().subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => console.error('Failed to load stats', err)
    });
  }

  logout() {
    localStorage.removeItem('admin_session');
    this.router.navigate(['/']);
  }
}
