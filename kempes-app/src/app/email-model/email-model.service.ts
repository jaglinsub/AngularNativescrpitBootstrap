import { Injectable, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from '../signup/User';
import { UserServiceService } from '../services/user-service.service';
import { SignupService } from '../signup/signup.service';
import { ParentUser } from '../parent/ParentUser';

@Injectable({
  providedIn: 'root'
})
export class EmailModelService {
  user: User;
  userId: string;

  constructor(private http: HttpClient, private userService: UserServiceService, private signupService: SignupService) {
    this.userService.user$.subscribe((usr) => {
      this.user = usr;
      this.userId = usr.id;
    });
    console.log("EmailModelService Cons: Logged in this.userId=" + this.userId);

   }

   saveParentEmail(parentEmail: string) {
    console.log("EmailModelService saveParentEmail: Logged in this.userId=" + JSON.stringify(this.user));
    console.log("EmailModelService saveParentEmail:Parent Email=" + parentEmail);
    if(!this.user.parentUser) {
      this.user.parentUser = new ParentUser();
    }
    this.user.parentUser.email = parentEmail;
    this.signupService.saveUser(this.user).subscribe(
      data => {
        this.user = data;
        this.userService.setUser(data);
      }
    );

   }
}
