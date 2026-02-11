import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';
import { ProjectService } from '../../services/project.service';
import { ContactService, Message } from '../../services/contact.service';
import { SettingsService, AppSettings } from '../../services/settings.service';
import { AuthService } from '../../services/auth.service';
import { MediaService, Media } from '../../services/media.service';
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
  private settingsService = inject(SettingsService);
  private mediaService = inject(MediaService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  activeTab = signal<'analytics' | 'projects' | 'messages' | 'settings' | 'media'>('analytics');
  stats = signal<any>(null);
  projects = signal<Project[]>([]);
  messages = signal<Message[]>([]);
  settings = signal<AppSettings | null>(null);
  mediaList = signal<Media[]>([]);
  
  dateRange = signal<{start: string, end: string}>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  analyticsFilters = signal<any>({});
  
  unreadCount = computed(() => this.messages().filter(m => !m.isRead).length);
  
  isFormOpen = signal(false);
  isMediaPickerOpen = signal(false);
  activePickerField = signal<string | null>(null);
  editingId = signal<number | null>(null);
  projectForm: FormGroup;
  settingsForm: FormGroup;

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
      isFeatured: [false],
      order: [0],
      content: ['', Validators.required]
    });

    this.settingsForm = this.fb.group({
      siteTitle: [''],
      heroTitle: [''],
      heroSubtitle: [''],
      bioLead: [''],
      bioFull: [''],
      frontendSkills: [''],
      backendSkills: [''],
      toolSkills: [''],
      githubUrl: [''],
      linkedinUrl: [''],
      email: ['']
    });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/login']);
      return;
    }

    this.loadStats();
    this.loadProjects();
    this.loadMessages();
    this.loadSettings();
    this.loadMedia();
  }

  loadStats() {
    const range = this.dateRange();
    this.analyticsService.getStats(range.start, range.end, this.analyticsFilters()).subscribe({
      next: (data) => this.stats.set(data),
      error: (err) => {
        console.error('Failed to load stats', err);
        if (err.status === 401) this.authService.logout();
      }
    });
  }

  updateDateRange(start: string, end: string) {
    this.dateRange.set({ start, end });
    this.loadStats();
  }

  setDatePreset(days: number) {
    const end = new Date().toISOString().split('T')[0];
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    this.updateDateRange(start, end);
  }

  updateFilter(key: string, value: string) {
    const current = this.analyticsFilters();
    if (!value) {
      delete current[key];
    } else {
      current[key] = value;
    }
    this.analyticsFilters.set({ ...current });
    this.loadStats();
  }

  getScrollPercent(depth: number): number {
    const stats = this.stats();
    if (!stats?.engagementMetrics?.scrollStats) return 0;
    
    const depthStat = stats.engagementMetrics.scrollStats.find((s: any) => s.depth === depth.toString());
    if (!depthStat) return 0;
    
    return (parseInt(depthStat.count) / stats.totalViews) * 100;
  }

  getVitalsScore(metric: string, value: any): string {
    if (!value) return '';
    const val = parseFloat(value);
    
    if (metric === 'lcp') {
      if (val <= 2500) return 'good';
      if (val <= 4000) return 'needs-improvement';
      return 'poor';
    }
    if (metric === 'fid') {
      if (val <= 100) return 'good';
      if (val <= 300) return 'needs-improvement';
      return 'poor';
    }
    if (metric === 'cls') {
      if (val <= 0.1) return 'good';
      if (val <= 0.25) return 'needs-improvement';
      return 'poor';
    }
    return '';
  }

  downloadCSV(type: string) {
    const stats = this.stats();
    if (!stats) return;

    let data: any[] = [];
    let filename = `analytics-${type}.csv`;

    if (type === 'pages') data = stats.topPages;
    if (type === 'referrers') data = stats.topReferrers;
    if (type === 'utm') data = stats.utmStats;

    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportPDF() {
    window.print();
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

  loadSettings() {
    this.settingsService.getSettings().subscribe({
      next: (data) => {
        this.settings.set(data);
        this.settingsForm.patchValue({
          ...data,
          frontendSkills: data.frontendSkills?.join(', ') || '',
          backendSkills: data.backendSkills?.join(', ') || '',
          toolSkills: data.toolSkills?.join(', ') || ''
        });
      },
      error: (err) => console.error('Failed to load settings', err)
    });
  }

  loadMedia() {
    this.mediaService.getMedia().subscribe({
      next: (data) => this.mediaList.set(data),
      error: (err) => console.error('Failed to load media', err)
    });
  }

  setTab(tab: 'analytics' | 'projects' | 'messages' | 'settings' | 'media') {
    this.activeTab.set(tab);
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mediaService.upload(file).subscribe({
        next: () => this.loadMedia(),
        error: (err) => console.error('Upload failed', err)
      });
    }
  }

  deleteMediaAsset(id: number) {
    if (confirm('Delete this asset?')) {
      this.mediaService.deleteMedia(id).subscribe({
        next: () => this.loadMedia(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  openMediaPicker(field: string) {
    this.activePickerField.set(field);
    this.isMediaPickerOpen.set(true);
  }

  closeMediaPicker() {
    this.isMediaPickerOpen.set(false);
    this.activePickerField.set(null);
  }

  selectMediaForProject(url: string) {
    const field = this.activePickerField();
    if (!field) return;

    if (field === 'gallery') {
      const current = this.projectForm.get('gallery')?.value || '';
      const fullUrl = `http://localhost:3000${url}`;
      const newVal = current ? `${current}, ${fullUrl}` : fullUrl;
      this.projectForm.patchValue({ gallery: newVal });
    } else {
      this.projectForm.patchValue({ [field]: `http://localhost:3000${url}` });
    }
    this.closeMediaPicker();
  }

  saveSettings() {
    const formValue = this.settingsForm.value;
    const settingsData = {
      ...formValue,
      frontendSkills: formValue.frontendSkills ? formValue.frontendSkills.split(',').map((s: string) => s.trim()) : [],
      backendSkills: formValue.backendSkills ? formValue.backendSkills.split(',').map((s: string) => s.trim()) : [],
      toolSkills: formValue.toolSkills ? formValue.toolSkills.split(',').map((s: string) => s.trim()) : []
    };

    this.settingsService.updateSettings(settingsData).subscribe({
      next: (data) => {
        this.settings.set(data);
        alert('Settings updated successfully!');
      },
      error: (err) => console.error('Failed to update settings', err)
    });
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
    this.authService.logout();
  }
}
