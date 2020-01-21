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
import { PoboxdetailsComponent } from './poboxdetails/poboxdetails.component';
import { SavedoppurtunityComponent } from './savedoppurtunity/savedoppurtunity.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {
            breadcrumb: 'Home'
        }
    },
    {
        path: 'signup',
        canActivate: [AuthGuard],
        component: SignupComponent,
        data: {
            breadcrumb: 'Sign Up'
        }
    },
    {
        path: 'interests',
        canActivate: [AuthGuard],
        component: InterestsComponent,
        data: {
            breadcrumb: 'Interest'
        }
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
        // data: {
        //     breadcrumb: 'Portfolio'
        // },
        children: [
            {
                path: 'myprofile',
                canActivate: [AuthGuard],
                component: MyprofileComponent,
                data: {
                    breadcrumb: 'Profile'
                }
            },
            {
                path: 'careerchecklist',
                canActivate: [AuthGuard],
                component: CareerchecklistComponent,
                data: {
                    breadcrumb: 'Career Checklist'
                }
            },
            {
                path: 'pobox',
                canActivate: [AuthGuard],
                component: PoboxComponent,
                data: {
                    breadcrumb: 'P.O.Box'
                },
                children: [
                    
                ]
            },
            {
                path: 'pobox/poboxdtls/:id',
                canActivate: [AuthGuard],
                component: PoboxdetailsComponent,
            },

            {
                path: 'savedoppurtunity',
                canActivate: [AuthGuard],
                component: SavedoppurtunityComponent,
                data: {
                    breadcrumb: 'Saved Oppurtunity'
                },
            },
            {
                path: 'savedoppurtunity/poboxdtls/:id',
                canActivate: [AuthGuard],
                component: PoboxdetailsComponent,
            },
        ]
    },
    {
        path: 'payment',
        // canActivate: [AuthGuard],
        component: PaymentComponent,
        data: {
            breadcrumb: 'Sign Up'
        }
    },
];
