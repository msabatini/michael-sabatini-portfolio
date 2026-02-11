import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private baseApiUrl = environment.apiUrl.endsWith('/') 
    ? environment.apiUrl.slice(0, -1) 
    : environment.apiUrl;

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseApiUrl}/contact/messages`);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseApiUrl}/contact/messages/${id}/read`, {});
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/contact/messages/${id}`);
  }
}
