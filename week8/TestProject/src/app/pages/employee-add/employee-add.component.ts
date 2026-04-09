import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-add.component.html'
})
export class EmployeeAddComponent {
  private api = inject(EmployeeService);
  private router = inject(Router);

  username = '';
  password = '';
  role = '';

  loading = false;
  error = '';
  success = '';

  submit(): void {
    if (!this.username || !this.password || !this.role) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.api.createEmployee({
      username: this.username,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        this.success = 'Employee created successfully';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 700);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to create employee';
        this.loading = false;
      }
    });
  }
}
