import {
  Component, OnInit, NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { User } from './User';
import { UserType } from './UserType';
import { SignupService } from "./signup.service";
import { AuthService } from '../services/auth.service';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService, AuthService],
})
export class SignupComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  modelPerson = new User();
  modelPersonType = new UserType();
  isValidFormSubmitted: boolean;

  //modelPerson = new User(0, "", "", "", new Date().getDate(), "", "", "", "", new UserType(0, "", ""));

  constructor(private cd: ChangeDetectorRef,
    private zone: NgZone, private signupService: SignupService, private authService: AuthService, private userService: UserServiceService, private router: Router) {

    this.userService.user$.subscribe((usr) => {
      //this.modelPerson = usr;
      this.updateModel(usr);
      // console.log("model person=" + this.modelPerson.userType.typeName);
    });
    console.log("model person 2=" + JSON.stringify(this.modelPerson));
  }

  updateModel(modelPerson: User) {
    if (modelPerson) {
      this.modelPerson = modelPerson;
      console.log("model person 3=" + JSON.stringify(this.modelPerson));
      /* this.zone.run(() => {

        this.cd.detectChanges();

      }) */
    }
  }
  ngOnInit() {

    this.isValidFormSubmitted = true;
    if (this.modelPerson.userType == null || this.modelPerson.userType.typeName == null) {
      console.log("model userType or typename is null =" + JSON.stringify(this.modelPerson));
      this.modelPerson.userType = this.modelPersonType;
    }

    this.modelPerson.email = this.authService.isLoggedIn ? this.authService.userDetails.providerData[0].email : "";

    //this.modelPersonType.type = "Student";
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

  onSubmit(signupForm) {

    this.isValidFormSubmitted = false;
		if (signupForm.valid) {
			this.isValidFormSubmitted = true;
		} else {
			return;
		}
    console.log(this.modelPerson.firstName);
    console.log(this.modelPerson.userType.typeName);
    console.log("onSubmit of User= " + this.modelPerson);
    let re = /\//gi;
    this.modelPerson.dateofBirth = this.modelPerson.dateofBirth.replace(re, "-");
    this.signupService.saveUser(this.modelPerson).subscribe(
      data => {
        this.modelPerson = data;
        console.log("After response" + this.modelPerson.dateofBirth);
        this.userService.setUser(data);
        this.router.navigate(['interests']);
      }
    );

  }

  textOnly(event: Event): void {
    let e = <KeyboardEvent>event;
    var key = e.keyCode || e.which;
    var value = String.fromCharCode(key);
    console.log("Key Code=" + e.keyCode + " :value=" + value)
    let regexp = new RegExp('[^0-9]');
    if (!regexp.test(value)) {
      e.preventDefault();
    }
  }

  textOnly_old(event: Event): void {
    let e = <KeyboardEvent>event;
    console.log("Key Code=" + e.keyCode)
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (((e.keyCode < 65 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105) && (e.keyCode > 185 || e.keyCode < 193)) {
      
      e.preventDefault();
    }
  }

}
