import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DataTableComponent],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  private api = inject(EmployeeService);
  private router = inject(Router);

  employees: Employee[] = [];
  loading = false;
  error = '';

  columns = [
    { key: 'username', label: 'Username' },
    { key: 'role', label: 'Role' },
    { key: 'created_on', label: 'Created On' }
  ];

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.error = '';

    this.api.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  handleEdit(employee: Employee): void {
    this.router.navigate(['/employees/edit', employee.username]);
  }

  handleDelete(employee: Employee): void {
    const confirmed = confirm(`Delete ${employee.username}?`);
    if (!confirmed) return;

    this.api.deleteEmployee(employee.username).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.username !== employee.username);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete employee');
      }
    });
  }
}
