import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignupService } from "../signup/signup.service";
import { User } from '../signup/User';
import { UserServiceService } from '../services/user-service.service';
import { Interests } from '../interests/Interests';
import { InterestService } from '../interests/interest.service';
import { EmailPasswordCredentials } from './EmailPasswordCredentials';

export class sigupLogin {
  showConfirmPassword: boolean;
  loginText: string;
  twitterText: string;
  funText: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  siguplogin: sigupLogin;
  modelPerson: User;
  interests: Interests;
  emailPasswordCredentials: EmailPasswordCredentials;
  emailFromToken: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private authService: AuthService, private userService: UserServiceService, private sigupService: SignupService, private interestService: InterestService, private router: Router, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef,
    private zone: NgZone) {
  }

  ngOnInit() {
    this.siguplogin = new sigupLogin();
    this.emailPasswordCredentials = new EmailPasswordCredentials();
    this.activatedRoute.paramMap.subscribe(params => {

      console.log("ngOnInit Route Params=", params);
      if (params.get('id') == '1') { //(1)

        this.siguplogin.showConfirmPassword = true;
        this.siguplogin.loginText = "Sign up with Email";
        this.siguplogin.twitterText = "Sign up with Twitter";
        this.siguplogin.funText = "Sign up to keep the fun going";
      }
      else {
        this.siguplogin.showConfirmPassword = false;
        this.siguplogin.loginText = "Log in with Email";
        this.siguplogin.twitterText = "Log in with Twitter";
        this.siguplogin.funText = "Log in to keep the fun going";
      }

      if(params.get('token')) {
        let token = params.get('token');
        this.zone.run(async () => {
          this.cd.detectChanges();
        (await this.sigupService.findUserById(token)).subscribe(
          data => {
            this.emailPasswordCredentials.email = data.parentUser.email;
            
            console.log("Found email from token=" + token + " :: Email=" + this.emailPasswordCredentials.email);
            if(this.emailPasswordCredentials.email) {
              this.emailFromToken = true;
            }
            
          });
        });
      }
      console.log("inside showConfirmPassword=", this.siguplogin.showConfirmPassword);
    });
    console.log("showConfirmPassword=", this.siguplogin.showConfirmPassword);
  }

  ngOnChanges() {
    this.activatedRoute.params.subscribe(params => {
      console.log("ngOnInit Route Params=", params);
      if (params['id']) {
        (1)
        console.log("Route Params in side=", params['id']);
        this.siguplogin.showConfirmPassword = true;
        this.siguplogin.loginText = "Sign up";
      }
      else {
        console.log("Route Params in side=", params['id']);
        this.siguplogin.showConfirmPassword = false;
        this.siguplogin.loginText = "Login";
      }
    });
  }

  signInWithTwitter() {
    this.authService.signInWithTwitter()
      .then(() => {
        //this.router.navigate(['signup'])
        console.log("After routing");
      })
      .then(() => {
        this.routeAfterLogin();
      })
      .catch((err) => console.log(err));

    console.log("outside of signin");
  }

  routeAfterLoginWithEmail(emailId: string) {
    this.zone.run(async () => {
      this.cd.detectChanges();
      let userFound: boolean = false;
      let parentFound: boolean = false;
       console.log("user logged in true");
        (await this.sigupService.findUserByEmailId(emailId)).subscribe(
          data => {
            console.log("data outside = " + JSON.stringify(data));
            if (data) {
              userFound = true;
              console.log("data=" + data.firstName);
              this.userService.setUser(data);

              this.interestService.findInterestforUser().subscribe(interests => {
                this.interests = interests;
                if (this.interests.userId != undefined) {
                  this.authService.showProfileMenu = true;
                  this.router.navigate(['portfolio/pobox']);
                  this.userService.setInterests(interests);
                  // this.router.navigate(['portfolio/myprofile']);
                  // this.userService.setUser(data);
                }
                else {
                  this.router.navigate(['interests']);
                }
                console.log("Interest=" + JSON.stringify(this.interests));
              });
            }
            else {
              // this.router.navigate(['signup']);
              userFound = false;
            }

          }
        );
        if(userFound == false) {
          console.log("Checking for Parent");
          (await this.sigupService.findParenByEmailId(emailId)).subscribe( parentData => {
            if (parentData) {
              console.log("Parent found:" + parentData.email);
              parentFound = true;
              this.userService.setParentUser(parentData);
              
              this.router.navigate(['payment']);
            }
            else {
              parentFound = false;
              this.router.navigate(['signup']);
            }
          });
        }
    }).catch((err) => console.log(err));

  }
  routeAfterLogin() {
    this.zone.run(async () => {
      this.cd.detectChanges();

      if (this.authService.isLoggedIn) {
        console.log("user logged in true");
        (await this.sigupService.findUserByEmail()).subscribe(
          data => {
            console.log("data outside = " + JSON.stringify(data));
            if (data) {
              console.log("data=" + data.firstName);
              this.userService.setUser(data);

              this.interestService.findInterestforUser().subscribe(interests => {
                this.interests = interests;
                if (this.interests.userId != undefined) {
                  this.authService.showProfileMenu = true;
                  this.router.navigate(['portfolio/pobox']);
                  this.userService.setInterests(interests);
                  // this.router.navigate(['portfolio/myprofile']);
                  // this.userService.setUser(data);
                }
                else {
                  this.router.navigate(['interests']);
                }
                console.log("Interest=" + JSON.stringify(this.interests));
              });
            }
            else {
              this.router.navigate(['signup']);
            }

          }
        );

      }
    }).catch((err) => console.log(err));
  }
  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(() => {
        this.router.navigate(['signup'])
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => {
        this.router.navigate(['interests'])
      })
      .catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
      .then(() => {
        this.router.navigate(['interests'])
      })
      .catch((err) => console.log(err));
  }

  signInWithEmail() {
    // this.router.navigate(['interests']);

    if (this.siguplogin.showConfirmPassword) {
      this.authService.createUserWithEmailAndPassword(this.emailPasswordCredentials.email, this.emailPasswordCredentials.password)
        .then((res) => {
          console.log(res);
          //this.router.navigate(['interests']);
            // this.routeAfterLogin();
            this.routeAfterLoginWithEmail(res.user.providerData[0].email);
        })
        .catch((err) => console.log('error: ' + err));
    }
    else {
      this.authService.signInRegular(this.emailPasswordCredentials.email, this.emailPasswordCredentials.password)
        .then((res) => {
          console.log("Data from signInRegular=" + res.user.providerData[0].email);
          //this.router.navigate(['interests']);
          // this.routeAfterLogin();
          this.routeAfterLoginWithEmail(res.user.providerData[0].email);
        })
        .catch((err) => console.log('error: ' + err));
    }
  }





}
