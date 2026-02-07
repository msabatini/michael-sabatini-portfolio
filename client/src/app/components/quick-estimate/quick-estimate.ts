import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Icon } from '../icon/icon';
import { ProjectService } from '../../services/project.service';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-quick-estimate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Icon],
  templateUrl: './quick-estimate.html',
  styleUrl: './quick-estimate.scss',
})
export class QuickEstimate implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);
  estimateForm: FormGroup;
  submitted = false;
  success = false;

  constructor() {
    this.estimateForm = this.fb.group({
      basics: ['', [Validators.required, Validators.minLength(10)]],
      existing: ['nothing', Validators.required],
      problem: ['', [Validators.required, Validators.minLength(10)]],
      timeline: ['no-rush', Validators.required],
      timelineExplanation: [''],
      budget: ['not-sure', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Quick Project Estimate',
      description: 'Get a rough sense of scope, timeline, or cost for your website or web app project.',
      url: 'quick-estimate'
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.estimateForm.valid) {
      this.projectService.sendContactForm({
        name: 'Quick Estimate Request',
        email: this.estimateForm.value.email,
        subject: 'Quick Project Estimate',
        message: JSON.stringify(this.estimateForm.value, null, 2)
      }).subscribe({
        next: () => {
          this.success = true;
          this.estimateForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error('Submission error:', err);
          alert('Failed to send estimate request. Please try again later.');
        }
      });
    }
  }
}
