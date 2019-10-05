import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { SignupComponent } from '@src/app/signup/signup.component';
import { LoginComponent } from '@src/app/login/login.component';
import { InterestsComponent } from '@src/app/interests/interests.component';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { AuthGuard }   from './services/auth-guard.service';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PoboxComponent } from './pobox/pobox.component';

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
    {
        path: 'portfolio',
        component: DashboardComponent,
        children: [
            {
                path: 'myprofile',
                component: MyprofileComponent,
            },
            {
                path: 'careerchecklist',
                component: InterestsComponent,
            },
            {
                path: 'pobox',
                component: PoboxComponent,
            },
        ]
    },
];
