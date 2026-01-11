import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Icon } from '../icon/icon';
import { ProjectService } from '../../services/project.service';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);
  contactForm: FormGroup;
  submitted = false;
  success = false;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Contact',
      description: 'Get in touch with Michael Sabatini for collaborations, project inquiries, or just to say hello.',
      url: 'contact'
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.projectService.sendContactForm(this.contactForm.value).subscribe({
        next: () => {
          this.success = true;
          this.contactForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error('Submission error:', err);
          alert('Failed to send message. Please try again later.');
        }
      });
    }
  }
}
