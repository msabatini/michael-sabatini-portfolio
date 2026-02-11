import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseApiUrl = environment.apiUrl.endsWith('/') 
    ? environment.apiUrl.slice(0, -1) 
    : environment.apiUrl;

  currentUser = signal<any>(null);

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/auth/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('admin_token', res.access_token);
        this.currentUser.set({ username: credentials.username });
      })
    );
  }

  logout() {
    localStorage.removeItem('admin_token');
    this.currentUser.set(null);
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('admin_token');
  }

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  }
}
