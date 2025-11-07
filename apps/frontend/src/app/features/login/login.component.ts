import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <div>
        <label for="username">Username:</label>
        <input id="username" type="text" [(ngModel)]="username" name="username" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" [(ngModel)]="password" name="password" required />
      </div>

      <button type="submit">Login</button>
    </form>

    <p *ngIf="errorMessage" style="color:red">{{ errorMessage }}</p>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  // Where the authentication process begins on the client side
  // Username and password are gathered from the form and sent to the AuthService
  // If successful, the user is redirected to the dashboard, otherwise an error message is displayed
  
  login() {
    this.errorMessage = '';
  
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}


