import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { NavbarComponent } from '@src/app/navbar/navbar.component';
import { SignupComponent } from '@src/app/signup/signup.component';
import { InterestsComponent } from '@src/app/interests/interests.component';
import { LoginComponent } from '@src/app/login/login.component';
import { DashboardComponent } from '@src/app/dashboard/dashboard.component';
import { MyprofileComponent } from '@src/app/myprofile/myprofile.component';
import { PoboxComponent } from '@src/app/pobox/pobox.component';
import { CareerchecklistComponent } from '@src/app/careerchecklist/careerchecklist.component';
import { AboutusComponent } from '@src/app/aboutus/aboutus.component';
import { PoboxdetailsComponent } from '@src/app/poboxdetails/poboxdetails.component';
import { SavedoppurtunityComponent } from '@src/app/savedoppurtunity/savedoppurtunity.component';
import { PaymentComponent } from '@src/app/payment/payment.component';
import { ParentComponent } from '@src/app/parent/parent.component';
import { EmailModelComponent } from '@src/app/email-model/email-model.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

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
    PoboxdetailsComponent,
    SavedoppurtunityComponent,
    PaymentComponent,
    ParentComponent,
    EmailModelComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
