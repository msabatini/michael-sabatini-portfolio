import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrl: './icon.scss'
})
export class Icon {
  @Input({ required: true }) name: string = '';
  @Input() size: number | string = 24;
  @Input() color: string = 'currentColor';
  @Input() strokeWidth: number = 2;

  get iconSize() {
    return typeof this.size === 'number' ? `${this.size}px` : this.size;
  }
}
