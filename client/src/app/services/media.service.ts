import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Media {
  id: number;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private http = inject(HttpClient);
  private baseApiUrl = environment.apiUrl.endsWith('/') 
    ? environment.apiUrl.slice(0, -1) 
    : environment.apiUrl;

  getMedia(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.baseApiUrl}/media`);
  }

  upload(file: File): Observable<Media> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Media>(`${this.baseApiUrl}/media/upload`, formData);
  }

  deleteMedia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/media/${id}`);
  }
}
