import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-admin-access',
  standalone: true,
  imports: [CommonModule, RouterModule, Icon],
  templateUrl: './admin-access.html',
  styleUrl: './admin-access.scss'
})
export class AdminAccess {}
