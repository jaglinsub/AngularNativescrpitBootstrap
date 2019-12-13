import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
// import { Observable } from 'rxjs/Observable';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserServiceService } from './user-service.service';
import { User } from '../signup/User';
import { Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
  public isUserLoggedIn: boolean;
  public showProfileMenu: boolean = false;
  private userSubscription: Subscription;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private userService: UserServiceService) {
    this.user = _firebaseAuth.authState;

    this.userSubscription = this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.isUserLoggedIn = true;
          console.log("User Deatils at subscrcribe=" + JSON.stringify(this.userDetails));
        } else {
          console.log("User details set to null");
          this.userDetails = null;
          this.isUserLoggedIn = false;
        }
      }
    );
  }

  checkUser() {
    this._firebaseAuth.auth.onAuthStateChanged((usr) => {
      if(usr) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithGithub() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    )
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  createUserWithEmailAndPassword(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  isLoggedIn() {
    
    const loggedIn = this._firebaseAuth.authState.pipe(first()).toPromise();
    loggedIn.then(log => {
      if(log != null) {
        this.userDetails == log;
        console.log("loggedIn = " + log.providerData[0].email);
      }
    }
    );
    console.log("isLoggedIn::Logged in user = " + JSON.stringify(this.userDetails));
    // return this._firebaseAuth.authState.pipe(first()).toPromise();
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  isLoggedIn_old() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  async logout() {
    await this._firebaseAuth.auth.signOut()
      ///.then((res) => this.router.navigate(['/']))
      .then(() => {
        this._firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {

        })
        this.userService.setUser(new User());

        //this.userDetails.providerData[0]
        this.userDetails = null;
        
        this.showProfileMenu = false;
        // this.userSubscription.unsubscribe();
        // this.user = null;
        this.router.navigate(['/']);

      }
      );
    console.log("Finished log out");
  }

  async fetchUserEmail() {
    const user1 = await this.isLoggedIn();
    if (user1) {

      
      console.log("fetchUserEmail::Logged in user email 1=" + this.userDetails.providerData[0].email);
      return this.userDetails.providerData[0].email;
    }
    else {
      return "";
    }
  }
}
