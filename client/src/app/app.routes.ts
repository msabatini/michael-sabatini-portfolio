import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Print } from './components/print/print';
import { PrintDetail } from './components/print-detail/print-detail';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { QuickEstimate } from './components/quick-estimate/quick-estimate';
import { Resume } from './components/resume/resume';
import { NotFound } from './components/not-found/not-found';
import { AdminLogin } from './components/admin-login/admin-login';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'resume', component: Resume },
  { path: 'portfolio', component: Print },
  { path: 'portfolio/:id', component: PrintDetail },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'quick-estimate', component: QuickEstimate },
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/dashboard', component: AdminDashboard },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '/404' }
];
