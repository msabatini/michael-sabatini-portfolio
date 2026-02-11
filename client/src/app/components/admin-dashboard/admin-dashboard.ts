import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';
import { ProjectService } from '../../services/project.service';
import { ContactService, Message } from '../../services/contact.service';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, Icon, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {
  private router = inject(Router);
  private analyticsService = inject(AnalyticsService);
  private projectService = inject(ProjectService);
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  activeTab = signal<'analytics' | 'projects' | 'messages'>('analytics');
  stats = signal<any>(null);
  projects = signal<Project[]>([]);
  messages = signal<Message[]>([]);
  
  isFormOpen = signal(false);
  editingId = signal<number | null>(null);
  projectForm: FormGroup;

  constructor() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completedDate: [''],
      tags: [''],
      challenge: [''],
      solution: [''],
      result: [''],
      imageUrl: [''],
      companyLogo: [''],
      mockupUrl: [''],
      gallery: [''],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!localStorage.getItem('admin_session')) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.loadStats();
    this.loadProjects();
    this.loadMessages();
  }

  loadStats() {
    this.analyticsService.getStats().subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => console.error('Failed to load stats', err)
    });
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects.set(data),
      error: (err) => console.error('Failed to load projects', err)
    });
  }

  loadMessages() {
    this.contactService.getMessages().subscribe({
      next: (data) => this.messages.set(data),
      error: (err) => console.error('Failed to load messages', err)
    });
  }

  setTab(tab: 'analytics' | 'projects' | 'messages') {
    this.activeTab.set(tab);
  }

  openForm(project?: Project) {
    if (project) {
      this.editingId.set(project.id);
      this.projectForm.patchValue({
        ...project,
        tags: project.tags?.join(', ') || '',
        gallery: project.gallery?.join(', ') || ''
      });
    } else {
      this.editingId.set(null);
      this.projectForm.reset();
    }
    this.isFormOpen.set(true);
  }

  closeForm() {
    this.isFormOpen.set(false);
    this.editingId.set(null);
    this.projectForm.reset();
  }

  saveProject() {
    if (this.projectForm.invalid) return;

    const formValue = this.projectForm.value;
    const projectData = {
      ...formValue,
      tags: formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()) : [],
      gallery: formValue.gallery ? formValue.gallery.split(',').map((g: string) => g.trim()) : []
    };

    const request = this.editingId() 
      ? this.projectService.updateProject(this.editingId()!, projectData)
      : this.projectService.createProject(projectData);

    request.subscribe({
      next: () => {
        this.loadProjects();
        this.closeForm();
      },
      error: (err) => console.error('Failed to save project', err)
    });
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => console.error('Failed to delete project', err)
      });
    }
  }

  markMessageAsRead(id: number) {
    this.contactService.markAsRead(id).subscribe({
      next: () => this.loadMessages(),
      error: (err) => console.error('Failed to mark message as read', err)
    });
  }

  deleteMessage(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.contactService.deleteMessage(id).subscribe({
        next: () => this.loadMessages(),
        error: (err) => console.error('Failed to delete message', err)
      });
    }
  }

  getMaxActivity(): number {
    const activity = this.stats()?.dailyActivity;
    if (!activity || activity.length === 0) return 0;
    return Math.max(...activity.map((a: any) => a.count), 1);
  }

  logout() {
    localStorage.removeItem('admin_session');
    this.router.navigate(['/']);
  }
}
