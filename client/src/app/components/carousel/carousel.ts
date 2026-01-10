import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel {
  @Input({ required: true }) images: string[] = [];
  
  currentIndex = signal(0);

  next() {
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
  }

  setIndex(index: number) {
    this.currentIndex.set(index);
  }
}
