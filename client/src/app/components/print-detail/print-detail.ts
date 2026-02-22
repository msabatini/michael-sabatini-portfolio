import { Component, OnInit, OnDestroy, AfterViewInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Icon } from '../icon/icon';
import { FindashHero } from '../findash-hero/findash-hero';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-print-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon, FindashHero],
  templateUrl: './print-detail.html',
  styleUrl: './print-detail.scss',
})
export class PrintDetail implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private projectService = inject(ProjectService);
  apiUrl = environment.apiUrl;
  
  project = signal<Project | null>(null);
  private modal: HTMLElement | null = null;
  private modalImg: HTMLImageElement | null = null;
  private modalMeta: HTMLElement | null = null;
  private clickListener: ((e: Event) => void) | null = null;
  private keyListener: ((e: KeyboardEvent) => void) | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(Number(id));
    }
  }

  ngAfterViewInit(): void {
    this.initializeModal();
  }

  ngOnDestroy(): void {
    this.removeModalListeners();
  }

  loadProject(id: number) {
    this.projectService.getProject(id).subscribe({
      next: (proj) => {
        this.project.set(proj);
        this.seoService.updateMetaTags({
          title: `${proj.title} | Graphic Design`,
          description: proj.description,
          url: `print/${id}`
        });
      },
      error: (err) => console.error('Error loading project', err)
    });
  }

  private initializeModal(): void {
    this.modal = document.getElementById('imageModal');
    this.modalImg = document.getElementById('imageModalImg') as HTMLImageElement;
    this.modalMeta = document.getElementById('imageModalMeta');

    this.clickListener = (e: Event) => this.handleModalClick(e);
    this.keyListener = (e: KeyboardEvent) => this.handleModalKey(e);

    document.addEventListener('click', this.clickListener);
    document.addEventListener('keydown', this.keyListener);
  }

  private removeModalListeners(): void {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
    if (this.keyListener) {
      document.removeEventListener('keydown', this.keyListener);
    }
  }

  private handleModalClick(e: Event): void {
    const target = e.target as HTMLElement;
    const img = target.closest('img[data-modal-src]');
    const close = target.closest('[data-close="true"]');

    if (img) {
      const src = (img as HTMLImageElement).dataset['modalSrc'];
      const alt = img.getAttribute('alt') || 'Image preview';
      const meta = (img as HTMLImageElement).dataset['meta'] || '';
      this.openModal(src || '', alt, meta);
    } else if (close) {
      this.closeModal();
    }
  }

  private handleModalKey(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.modal?.classList.contains('is-open')) {
      this.closeModal();
    }
  }

  private openModal(src: string, alt: string, meta: string): void {
    if (!this.modal || !this.modalImg || !this.modalMeta) return;

    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');
    this.modalImg.src = src;
    this.modalImg.alt = alt;
    this.modalMeta.textContent = meta;
    document.body.style.overflow = 'hidden';
  }

  private closeModal(): void {
    if (!this.modal || !this.modalImg || !this.modalMeta) return;

    this.modal.classList.remove('is-open');
    this.modal.setAttribute('aria-hidden', 'true');
    this.modalImg.src = '';
    this.modalImg.alt = '';
    this.modalMeta.textContent = '';
    document.body.style.overflow = '';
  }
}
