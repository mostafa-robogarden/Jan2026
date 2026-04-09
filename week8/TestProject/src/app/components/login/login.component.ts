import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  loading = false;
  error = '';

  submit(): void {
    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Username and password are required';
      return;
    }

    this.loading = true;

    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'Invalid username or password';
      }
    });
  }
}
