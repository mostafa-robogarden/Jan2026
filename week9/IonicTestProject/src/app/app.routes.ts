import { Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';
import { HomePage } from './pages/home/home.page';
import { StudentsPage } from './pages/students/students.page';
import { SettingsPage } from './pages/settings/settings.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', component: HomePage },
      { path: 'students', component: StudentsPage },
      { path: 'settings', component: SettingsPage },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: 'tabs/home'
  }
];
