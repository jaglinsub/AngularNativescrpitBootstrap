import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { NavbarComponent } from '@src/app/navbar/navbar.component';
import { SignupComponent } from '@src/app/signup/signup.component';
import { InterestsComponent } from '@src/app/interests/interests.component';
import { LoginComponent } from '@src/app/login/login.component';
import { environment } from '@src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AuthGuard } from '@src/app/services/auth-guard.service';
import { AuthService } from '@src/app/services/auth.service';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { MyprofileComponent } from '@src/app/myprofile/myprofile.component';
import { PoboxComponent } from '@src/app/pobox/pobox.component';
import { CareerchecklistComponent } from '@src/app/careerchecklist/careerchecklist.component';
import { AboutusComponent } from '@src/app/aboutus/aboutus.component';
import { UserServiceService } from './services/user-service.service';
import { InterestService } from './interests/interest.service';
import { ProfileService } from './myprofile/profile.service';
import { CurrentPointsService } from './dashboard/current-points.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    InterestsComponent,
    LoginComponent,
    DashboardComponent,
    MyprofileComponent,
    PoboxComponent,
    CareerchecklistComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserServiceService,
    InterestService,
    ProfileService,
    CurrentPointsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
