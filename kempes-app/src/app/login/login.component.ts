import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignupService } from "../signup/signup.service";
import { User } from '../signup/User';
import { UserServiceService } from '../services/user-service.service';
import { Interests } from '../interests/Interests';
import { InterestService } from '../interests/interest.service';
import { Observable } from 'tns-core-modules/ui/core/bindable/bindable';
import { EmailPasswordCredentials } from './EmailPasswordCredentials';

export class sigupLogin {
  showConfirmPassword: boolean;
  loginText: string;
  twitterText: string;
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

  constructor(private authService: AuthService, private userService: UserServiceService, private sigupService: SignupService, private interestService: InterestService, private router: Router, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef,
    private zone: NgZone) {
    /* this.siguplogin = new sigupLogin();
    this.activatedRoute.params.subscribe( params => {
      console.log("Route Params=", params);
      if (params['id']) { (1)
        console.log("Route Params in side=", params['id']);
        this.siguplogin.showConfirmPassword = true;
        this.siguplogin.loginText = "Sign up";
      }
      else
      {
        console.log("Route Params in side=", params['id']);
        this.siguplogin.showConfirmPassword = false;
        this.siguplogin.loginText = "Login";
      }
    }); */
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
      }
      else {
        this.siguplogin.showConfirmPassword = false;
        this.siguplogin.loginText = "Login with Email";
        this.siguplogin.twitterText = "Login with Twitter";
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
      .then((res) => {
        //this.router.navigate(['signup'])
        console.log("After routing");
      })
      .then(() => {
        this.routeAfterLogin();
      })
      /* .then(() => {
        this.zone.run(async () => {
          this.cd.detectChanges();

          if (this.authService.isLoggedIn) {
            console.log("user logged in true");
            const result = (await this.sigupService.findUserByEmail());
            (await this.sigupService.findUserByEmail()).subscribe(
              data => {
                console.log("data outside = " + JSON.stringify(data));
                if (data) {
                  console.log("data=" + data.firstName);
                  this.userService.setUser(data);

                  this.interestService.findInterestforUser().subscribe(interests => {
                    this.interests = interests;
                    if (this.interests.userId != undefined) {
                      this.router.navigate(['portfolio/pobox']);
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
        })
      }) */
      .catch((err) => console.log(err));

    console.log("outside of signin");
  }

  routeAfterLogin() {
    this.zone.run(async () => {
      this.cd.detectChanges();

      if (this.authService.isLoggedIn) {
        console.log("user logged in true");
        const result = (await this.sigupService.findUserByEmail());
        (await this.sigupService.findUserByEmail()).subscribe(
          data => {
            console.log("data outside = " + JSON.stringify(data));
            if (data) {
              console.log("data=" + data.firstName);
              this.userService.setUser(data);

              this.interestService.findInterestforUser().subscribe(interests => {
                this.interests = interests;
                if (this.interests.userId != undefined) {
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
      .then((res) => {
        this.router.navigate(['signup'])
      })
      .catch((err) => console.log(err));
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['interests'])
      })
      .catch((err) => console.log(err));
  }

  signInWithGithub() {
    this.authService.signInWithGithub()
      .then((res) => {
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
            this.routeAfterLogin();
        })
        .catch((err) => console.log('error: ' + err));
    }
    else {
      this.authService.signInRegular(this.emailPasswordCredentials.email, this.emailPasswordCredentials.password)
        .then((res) => {
          console.log(res);
          //this.router.navigate(['interests']);
          this.routeAfterLogin();
        })
        .catch((err) => console.log('error: ' + err));
    }
  }





}
