import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../signup/User';
import { UserType } from '../signup/UserType';
import { Interests } from '../interests/Interests';
import { ParentUser } from '../parent/ParentUser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  modelPerson = new User();  
  modelPersonType = new UserType();
  
  interests = new Interests();

  parentUser = new ParentUser();
  
  private userSubject = new BehaviorSubject<User>(this.modelPerson);
  user$ = this.userSubject.asObservable();

  private interestSubject = new BehaviorSubject<Interests>(this.interests);
  interest$ = this.interestSubject.asObservable();

  private parentUserSubject = new BehaviorSubject<ParentUser>(this.parentUser);
  parentUser$ = this.parentUserSubject.asObservable();

  constructor() {
    //this.modelPerson.userType = this.modelPersonType;
    //this.setUser(this.modelPerson);
    console.log("Inside constructor of UserServiceService");
   }

   setUser(user: User) {
    this.userSubject.next(user);
  }

  setParentUser(parentUser: ParentUser) {
    this.parentUserSubject.next(parentUser);
  }

  setInterests(interests: Interests) {
    this.interestSubject.next(interests);
    console.log("Interest set either after login or after saving interest= " + JSON.stringify(interests));
  }
}
