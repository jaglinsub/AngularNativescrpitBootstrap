import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { SignupComponent } from '@src/app/signup/signup.component';
import { LoginComponent } from '@src/app/login/login.component';
import { InterestsComponent } from '@src/app/interests/interests.component';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { AuthGuard }   from './services/auth-guard.service';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { PoboxComponent } from './pobox/pobox.component';
import { CareerchecklistComponent } from './careerchecklist/careerchecklist.component';
import { AboutusComponent } from './aboutus/aboutus.component';

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
        path: 'aboutus',
        component: AboutusComponent,
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
                canActivate: [AuthGuard],
                component: MyprofileComponent,
            },
            {
                path: 'careerchecklist',
                canActivate: [AuthGuard],
                component: CareerchecklistComponent,
            },
            {
                path: 'pobox',
                canActivate: [AuthGuard],
                component: PoboxComponent,
            },
        ]
    },
];
