import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
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
    this.activatedRoute.paramMap.subscribe( params => {
      
      console.log("ngOnInit Route Params=", params);
      if (params.get('id') == '1') { //(1)
        
        this.siguplogin.showConfirmPassword = true;
        this.siguplogin.loginText = "Sign up with Email";
        this.siguplogin.twitterText = "Sign up with Twitter";
      }
      else
      {
        this.siguplogin.showConfirmPassword = false;
        this.siguplogin.loginText = "Login with Email";
        this.siguplogin.twitterText = "Login with Twitter";
      }
      console.log("inside showConfirmPassword=", this.siguplogin.showConfirmPassword);
    });
    console.log("showConfirmPassword=", this.siguplogin.showConfirmPassword);
  }

  ngOnChanges() {
    this.activatedRoute.params.subscribe( params => {
      console.log("ngOnInit Route Params=", params);
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
    });
  }

   signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => { 
          this.router.navigate(['signup'])
        })
      .catch((err) => console.log(err));
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
      this.router.navigate(['interests']);
      /* this.authService.signInRegular(this.user.email, this.user.password)
        .then((res) => {
          console.log(res);
          this.router.navigate(['interests']);
        })
        .catch((err) => console.log('error: ' + err)); */
    }



  

}
