import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isAdminOrManager } from '@libsAuth';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    private apiUrl = 'http://localhost:3000/tasks';

    constructor(private http: HttpClient) { }

    getTasks(org: string) {
        return this.http.get(this.apiUrl, { params: { organization: org } });
    }

    createTask(id: string, description: string, org: string, role: string) {
        // Service layer RBAC enforcement
        if (isAdminOrManager(role)) {
            return this.http.post(this.apiUrl, { employeeId: id, description, organization: org });
        }
        throw new Error('Unauthorized: Only admin or manager can delete tasks');
    }

    deleteTask(id: number, role: string) {
        // Service layer RBAC enforcement
        if (isAdminOrManager(role)) {
            return this.http.delete<void>(`${this.apiUrl}/${id}`);
        }
        throw new Error('Unauthorized: Only admin or manager can delete tasks');
    }
}
