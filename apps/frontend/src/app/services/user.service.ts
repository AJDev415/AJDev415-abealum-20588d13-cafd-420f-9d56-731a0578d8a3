import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isAdminOrManager } from '@libsAuth';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addUser(user: { username: string; password: string; role: string; org: string }, role: string): Observable<Object> {
    // Service layer RBAC enforcement
    if (!isAdminOrManager(role)) {
      throw new Error('Unauthorized: Only admin or manager can add users');
    }
    return this.http.post(`${this.baseUrl}/addUser`, user);
  }
}