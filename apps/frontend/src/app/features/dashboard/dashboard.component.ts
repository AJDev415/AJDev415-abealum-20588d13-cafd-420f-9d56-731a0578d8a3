import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '@libsData';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <article style="display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; width: 100%; height: 100%; padding: 2rem;">
    <div style="display: flex; justify-content: end;">
      <button 
        style="margin-top: 1rem; padding: 0.5rem; background-color: #3b82f6; color: white; border-radius: 0.25rem; cursor: pointer;"
        (click)="logOut()">
          Logout
      </button>
    </div>

  <!-- User Info -->
  <section style="display: flex; width: 100%; margin-bottom: 1.5rem; justify-content: space-around">
    <ng-container *ngIf="user; else loading">
      <p>Welcome, {{ user.username }}!</p>
      <p>Organization: {{ user.organization }}</p>
    </ng-container>

    <ng-template #loading>
      <p>Loading user info...</p>
    </ng-template>
  </section>

  <!-- Main Content -->
  <div *ngIf="user?.role === 'admin' || user?.role === 'manager'"  style="display: flex; width: 100%; gap: 1rem;">

    <!-- Add User Form -->
    <section style="display: flex; flex-direction: column; justify-content: flex-start; padding: 2rem; background-color: #eab308; width: 50%;">
      <h2 style="margin-bottom: 1rem;">Add User</h2>
      <form (ngSubmit)="addUser()" style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1rem; width: 100%; max-width: 28rem;">

        <div style="display: flex; flex-direction: column;">
          <label for="username" style="margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151;">Username:</label>
          <input id="username" type="text" [(ngModel)]="newUser.username" name="username" required
                 style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; outline: none;" />
        </div>

        <div style="display: flex; flex-direction: column;">
          <label for="password" style="margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151;">Password:</label>
          <input id="password" type="password" [(ngModel)]="newUser.password" name="password" required
                 style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; outline: none;" />
        </div>

        <div style="display: flex; flex-direction: column;">
          <label for="role" style="margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151;">Role:</label>
          <input id="role" type="text" [(ngModel)]="newUser.role" name="role" required
                 style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; outline: none;" />
        </div>

        <div style="display: flex; flex-direction: column;">
          <label for="organization" style="margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151;">Organization:</label>
          <input id="organization" type="text" [(ngModel)]="newUser.organization" name="organization" required
                 style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; outline: none;" />
        </div>

        <button type="submit"
                style="margin-top: 1rem; padding: 0.5rem; background-color: #3b82f6; color: white; border-radius: 0.25rem; cursor: pointer;">
          Add User
        </button>
      </form>
    </section>

    <!-- Create Task Form -->
    <section style="display: flex; flex-direction: column; justify-content: flex-start; padding: 2rem; background-color: #bbf7d0; width: 50%;">
      <h2 style="margin-bottom: 1rem;">Create Task</h2>
      <form (ngSubmit)="createTask()" style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1rem; width: 100%; max-width: 28rem;">

        <div style="display: flex; flex-direction: column;">
          <label for="employeeId" style="margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151;">Employee ID:</label>
          <input id="employeeId" type="number" [(ngModel)]="task.employeeId" name="employeeId" required
                 style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; outline: none;" />
        </div>

        <div style="display: flex; flex-direction: column;">
          <label for="description" style="margin-bottom: 0.25rem; font-size: 0.875rem; font-weight: 500; color: #374151;">Description:</label>
          <input id="description" type="text" [(ngModel)]="task.description" name="description" required
                 style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; outline: none;" />
        </div>

        <button type="submit"
                style="margin-top: 1rem; padding: 0.5rem; background-color: #3b82f6; color: white; border-radius: 0.25rem; cursor: pointer;">
          Add Task
        </button>
      </form>

      <p *ngIf="errorMessage" style="margin-top: 0.5rem; color: #dc2626;">{{ errorMessage }}</p>
    </section>

  </div>

  <!-- Tasks List -->
  <section style="display: flex; flex-direction: column; align-items: center; width: 100%; margin-top: 2rem; padding: 1rem;">
    <h1 style="margin-bottom: 1rem;">Tasks for {{ user?.organization }}</h1>
    <div *ngFor="let task of tasks" style="border-top: 1px solid #d1d5db; border-bottom: 1px solid #d1d5db; width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem;">
      <p>Task ID: {{ task.taskId }}</p>
      <p>Description: {{ task.description }}</p>
      <button *ngIf="user?.role === 'admin' || user?.role === 'manager'" 
              (click)="deleteTask(task.taskId)"
              style="margin-top: 0.5rem; padding: 0.5rem; background-color: #ef4444; color: white; border-radius: 0.25rem; cursor: pointer;">
        Delete Task
      </button>
    </div>
  </section>

</article>
  `,
})
export class DashboardComponent implements OnInit {
  user: { username: string; role: string; organization: string } | null = null;
  newUser: { username: string; password: string; role: string; organization: string } =
    { username: '', password: '', role: '', organization: '' };
  task: { employeeId: string; description: string; } = { employeeId: '', description: '' };
  errorMessage = '';
  tasks: any = [];

  constructor(private auth: AuthService, private userService: UserService, private taskService: TaskService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.taskService.getTasks(this.user?.organization as string).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  addUser() {
    this.errorMessage = '';

    this.userService.addUser({
      username: this.newUser.username,
      password: this.newUser.password,
      role: this.newUser.role,
      org: this.newUser.organization
    }, this.user?.role as string).subscribe({
      next: () => {
        this.errorMessage = '';
        alert('User added successfully');
      },
      error: (e: any) => {
        console.error('Error adding user', e);
        this.errorMessage = 'Error adding user';
      }
    });
  }

  createTask() {
    this.errorMessage = '';
    const role = this.user?.role as string;
    const organization = this.user?.organization as string;

    this.taskService.createTask(this.task.employeeId, this.task.description, organization, role).subscribe({
      next: () => {
        this.errorMessage = '';
        alert('Task created successfully');
      },
      error: (e: any) => {
        console.error('Error creating task', e);
        this.errorMessage = 'Error creating task';
      }
    });
  }

  deleteTask(taskId: number) {
    this.errorMessage = '';

    this.taskService.deleteTask(taskId, this.user?.role as string).subscribe({
      next: () => {
        this.errorMessage = '';
        alert('Task deleted successfully');
        this.tasks = this.tasks.filter((task: Task) => task.taskId !== taskId);
      },
      error: (e: any) => {
        console.error('Error deleting task', e);
        this.errorMessage = 'Error deleting task';
      }
    });
  }

  logOut() {
    this.auth.logout();
  }
}
