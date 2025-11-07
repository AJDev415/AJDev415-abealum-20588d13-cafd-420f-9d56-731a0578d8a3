import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private _username = '';
  private _role = '';
  private _organization = '';

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { username, role, organization } = JSON.parse(storedUser);
      this._username = username;
      this._role = role;
      this._organization = organization;
    }
  }

  // Here is where the authentication process continues on the client from the log in form
  // A POST request is sent to the backend with the username and password
  // If successful, the JWT is stored in local storage along with user details
  login(username: string, password: string) {
    return this.http
      .post<{ access_token: string; role: string; organization: string }>(
        `${this.baseUrl}/login`,
        { username, password }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.access_token);
  
          const user = {
            username,
            role: response.role,
            organization: response.organization,
          };
  
          localStorage.setItem('user', JSON.stringify(user));
          this.setUser(user.username, user.role, user.organization);
        })
      );
  }

  setUser(username: string, role: string, organization: string) {
    this._username = username;
    this._role = role;
    this._organization = organization;
  }

  getUser(): { username: string; role: string; organization: string } | null {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const { username, role, organization } = JSON.parse(storedUser);
        this.setUser(username, role, organization);
      } else {
        return null;
      }

    return {
      username: this._username,
      role: this._role,
      organization: this._organization,
    };
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._username = '';
    this._role = '';
    this._organization = '';
    this.router.navigate(['/login']);
  }
}
