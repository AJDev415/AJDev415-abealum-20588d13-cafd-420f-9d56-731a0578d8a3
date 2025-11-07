import { Route } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { Home } from './features/home/home.component';
import { AuthGuard} from './auth/auth.guard';
import { LoginComponent } from './features/login/login.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
