import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AppSettings {
  id: number;
  siteTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  bioLead: string;
  bioFull: string;
  frontendSkills: string[];
  backendSkills: string[];
  toolSkills: string[];
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private http = inject(HttpClient);
  private baseApiUrl = environment.apiUrl.endsWith('/') 
    ? environment.apiUrl.slice(0, -1) 
    : environment.apiUrl;

  getSettings(): Observable<AppSettings> {
    return this.http.get<AppSettings>(`${this.baseApiUrl}/settings`);
  }

  updateSettings(settings: Partial<AppSettings>): Observable<AppSettings> {
    return this.http.patch<AppSettings>(`${this.baseApiUrl}/settings`, settings);
  }
}
