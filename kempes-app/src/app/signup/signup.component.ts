import { Component, OnInit,NgZone,
  ChangeDetectorRef } from '@angular/core';
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

  modelPerson = new User();
  modelPersonType = new UserType();
  //modelPerson = new User(0, "", "", "", new Date().getDate(), "", "", "", "", new UserType(0, "", ""));

  constructor(private cd: ChangeDetectorRef,
    private zone: NgZone, private signupService: SignupService, private authService: AuthService, private userService: UserServiceService,  private router: Router) {

    this.userService.user$.subscribe((usr) => {
      //this.modelPerson = usr;
      this.updateModel(usr);
      // console.log("model person=" + this.modelPerson.userType.typeName);
    });
    console.log("model person 2=" + JSON.stringify(this.modelPerson));
  }

  updateModel(modelPerson: User) {
    if(modelPerson)
    {
      this.modelPerson = modelPerson;
      console.log("model person 3=" + JSON.stringify(this.modelPerson));
      /* this.zone.run(() => {

        this.cd.detectChanges();

      }) */
    }
  }
  ngOnInit() {
    

    if(this.modelPerson.userType == null || this.modelPerson.userType.typeName == null) {
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

  onSubmit() {
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
}
