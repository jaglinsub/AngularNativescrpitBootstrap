import { Component, OnInit } from '@angular/core';
import {User} from './User';
import { UserType } from './UserType';
import {SignupService} from "./signup.service";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService, AuthService],
})
export class SignupComponent implements OnInit {

  modelPerson = new User();
  
  modelPersonType = new UserType();
  //modelPerson = new User(0, "", "", "", new Date().getDate(), "", "", "", "", new UserType(0, "", ""));

  constructor(private signupService: SignupService, private authService: AuthService) { }

  ngOnInit() {
    //this.modelPersonType.type = "Student";
    this.modelPerson.userType = this.modelPersonType;
    this.modelPerson.email = this.authService.isLoggedIn ? this.authService.userDetails.providerData[0].email : "";
    /* this.modelPerson.firstName = "";
    this.modelPerson.lastName = "";
    
    // this.modelPerson.dateofBirth = new Date().getDate();
     this.modelPerson.dateofBirth = "";
    this.modelPerson.grade = "";
    this.modelPerson.location = "";
    this.modelPerson.phoneNumber = "";

    this.modelPersonType.type = "";
    this.modelPerson.userType = this.modelPersonType; */
  }

  onSubmit() {
    console.log(this.modelPerson.firstName); 
    console.log(this.modelPerson);
    this.signupService.saveUser(this.modelPerson).subscribe(
      data => {
        this.modelPerson;
        console.log("After response" + this.modelPerson.dateofBirth);
      }
    );

  }
}
