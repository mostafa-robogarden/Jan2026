import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './pages/employee-add/employee-add.component';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/add', component: EmployeeAddComponent, canActivate: [authGuard] },
  { path: 'employees/edit/:username', component: EmployeeEditComponent, canActivate: [authGuard] }
];
