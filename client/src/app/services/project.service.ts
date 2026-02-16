import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private baseApiUrl = environment.apiUrl;

  private normalizeProject(project: Project): Project {
    if (!project) return project;

    try {
      // Normalize Tags
      if (project.tags && Array.isArray(project.tags)) {
        const defaultTags = ['Full-Stack', 'UI/UX', 'Responsive', 'Development', 'Software', 'Digital'];
        let tags = [...project.tags];
        if (tags.length > 6) {
          tags = tags.slice(0, 6);
        } else {
          while (tags.length < 6) {
            const nextDefault = defaultTags.find(t => !tags.includes(t)) || 'Web';
            tags.push(nextDefault);
          }
        }
        project.tags = tags;
      }

      // Prepend API URL to relative asset paths
      const apiUrl = environment.apiUrl ? (environment.apiUrl.endsWith('/') 
        ? environment.apiUrl.slice(0, -1) 
        : environment.apiUrl) : '';

      const normalizeUrl = (url: any) => {
        if (!url || typeof url !== 'string') return url;
        // If it's already an absolute URL, return it
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        
        // In production, assets are served by the frontend from /assets
        if (environment.production) return url;

        // If it starts with /assets/, prepend the API URL
        if (url.startsWith('/assets/')) {
          return `${apiUrl}${url}`;
        }
        // If it starts with assets/ (no leading slash), prepend API URL with a slash
        if (url.startsWith('assets/')) {
          return `${apiUrl}/${url}`;
        }
        return url;
      };

      if (project.imageUrl) project.imageUrl = normalizeUrl(project.imageUrl);
      if (project.mockupUrl) project.mockupUrl = normalizeUrl(project.mockupUrl);
      if (project.gallery && Array.isArray(project.gallery)) {
        project.gallery = project.gallery.map(img => normalizeUrl(img));
      }
    } catch (e) {
      console.error('Error normalizing project:', e, project);
    }

    return project;
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseApiUrl}/projects`).pipe(
      map(projects => projects.map(p => this.normalizeProject(p)))
    );
  }

  getProjectsByType(type: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseApiUrl}/projects/type/${type}`).pipe(
      map(projects => projects.map(p => this.normalizeProject(p)))
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseApiUrl}/projects/${id}`).pipe(
      map(project => this.normalizeProject(project))
    );
  }

  createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.baseApiUrl}/projects`, project);
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${this.baseApiUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/projects/${id}`);
  }

  sendContactForm(data: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/contact`, data);
  }
}
