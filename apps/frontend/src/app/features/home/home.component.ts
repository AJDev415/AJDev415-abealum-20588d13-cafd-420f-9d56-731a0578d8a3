import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterLink], // necessary for *ngIf, *ngFor, etc.
  template: `
  <section style="display: flex; flex-direction: column;">
  <h1 class="text-3xl font-bold underline test-red">
  This is a generic home page, used to quickly assess if tailwind is working. Never figured out why it randomly stopped working!
  This text will be underlined if it is.
</h1>
<a routerLink="/dashboard" class="link">
  Go to Dashboard </a>
  <a routerLink="/login" class="link">
  Go to Login </a>
</section>

  `,
})
export class Home {}
