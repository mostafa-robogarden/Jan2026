import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  private api = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  username = '';
  role = '';
  password = '';

  loading = false;
  saving = false;
  error = '';
  success = '';

  ngOnInit(): void {
    const usernameParam = this.route.snapshot.paramMap.get('username');
    if (!usernameParam) {
      this.error = 'Username not found in route';
      return;
    }

    this.username = usernameParam;
    this.loadEmployee();
  }

  loadEmployee(): void {
    this.loading = true;
    this.error = '';

    this.api.getEmployee(this.username).subscribe({
      next: (data) => {
        this.role = data.role;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load employee';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (!this.role) {
      this.error = 'Role is required';
      return;
    }

    const payload: { role?: string; password?: string } = {
      role: this.role
    };

    if (this.password.trim()) {
      payload.password = this.password;
    }

    this.saving = true;
    this.error = '';
    this.success = '';

    this.api.updateEmployee(this.username, payload).subscribe({
      next: () => {
        this.success = 'Employee updated successfully';
        this.saving = false;
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 700);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to update employee';
        this.saving = false;
      }
    });
  }
}
