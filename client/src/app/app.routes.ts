import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Projects } from './components/projects/projects';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Resume } from './components/resume/resume';
import { ProjectDetail } from './components/project-detail/project-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'resume', component: Resume },
  { path: 'projects', component: Projects },
  { path: 'projects/:id', component: ProjectDetail },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];
