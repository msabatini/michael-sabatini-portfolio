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
  private baseApiUrl = 'http://127.0.0.1:3000';

  private normalizeTags(project: Project): Project {
    if (project.tags) {
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
    return project;
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseApiUrl}/projects`).pipe(
      map(projects => projects.map(p => this.normalizeTags(p)))
    );
  }

  getProjectsByType(type: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseApiUrl}/projects/type/${type}`).pipe(
      map(projects => projects.map(p => this.normalizeTags(p)))
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseApiUrl}/projects/${id}`).pipe(
      map(project => this.normalizeTags(project))
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
