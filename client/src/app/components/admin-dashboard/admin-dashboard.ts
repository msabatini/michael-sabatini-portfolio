import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    // Basic session check
    if (!localStorage.getItem('admin_session')) {
      this.router.navigate(['/admin/login']);
    }
  }

  logout() {
    localStorage.removeItem('admin_session');
    this.router.navigate(['/']);
  }
}
