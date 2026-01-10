import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private baseApiUrl = environment.apiUrl.endsWith('/') 
    ? environment.apiUrl.slice(0, -1) 
    : environment.apiUrl;

  constructor() {
    console.log('ProjectService initialized with API URL:', this.baseApiUrl);
  }

  getProjects(): Observable<Project[]> {
    console.log('Fetching projects from:', `${this.baseApiUrl}/projects`);
    return this.http.get<Project[]>(`${this.baseApiUrl}/projects`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseApiUrl}/projects/${id}`);
  }

  sendContactForm(data: any): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/contact`, data);
  }
}
