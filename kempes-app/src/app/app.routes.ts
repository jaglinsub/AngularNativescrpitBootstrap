import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { SignupComponent } from '@src/app/signup/signup.component';
import { LoginComponent } from '@src/app/login/login.component';
import { InterestsComponent } from '@src/app/interests/interests.component';
import { AuthGuard }   from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'signup',
        canActivate: [AuthGuard],
        component: SignupComponent,
    },
    {
        path: 'interests',
        canActivate: [AuthGuard],
        component: InterestsComponent,
    },
    {
        path: 'login/:id',
        component: LoginComponent,
    },
    // {
    //     path: 'login/2',
    //     component: LoginComponent,
    // },
];
