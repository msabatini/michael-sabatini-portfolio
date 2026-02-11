import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss'
})
export class AdminLogin {
  private router = inject(Router);
  
  credentials = {
    username: '',
    password: ''
  };
  
  error = signal<string | null>(null);

  onSubmit() {
    // Basic local auth for now
    if (this.credentials.username === 'admin' && this.credentials.password === 'admin123') {
      localStorage.setItem('admin_session', 'active');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error.set('Invalid credentials');
    }
  }
}
