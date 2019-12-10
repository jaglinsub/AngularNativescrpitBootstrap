import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../signup/User';
import { UserType } from '../signup/UserType';
import { Interests } from '../interests/Interests';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  
  modelPerson = new User();  
  modelPersonType = new UserType();
  
  interests = new Interests();
  
  private userSubject = new BehaviorSubject<User>(this.modelPerson);
  user$ = this.userSubject.asObservable();

  private interestSubject = new BehaviorSubject<Interests>(this.interests);
  interest$ = this.interestSubject.asObservable();

  constructor() {
    //this.modelPerson.userType = this.modelPersonType;
    //this.setUser(this.modelPerson);
    console.log("Inside constructor of UserServiceService");
   }

   setUser(user: User) {
    this.userSubject.next(user);
  }

  setInterests(interests: Interests) {
    this.interestSubject.next(interests);
    console.log("Interest set either after login or after saving interest= " + JSON.stringify(interests));
  }
}
