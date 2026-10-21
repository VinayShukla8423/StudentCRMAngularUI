
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  roleId = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.authService.login({
      Email: this.email.trim(),
      Password: this.password,
      RoleId: this.roleId
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
          alert(error['error']['message']);
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }

  logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
