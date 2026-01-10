import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './resume.html',
  styleUrl: './resume.scss',
})
export class Resume {
  downloadResume() {
    window.print();
  }
}
