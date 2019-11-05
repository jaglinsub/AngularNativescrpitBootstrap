import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../signup/User';
import { UserType } from '../signup/UserType';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  
  modelPerson = new User();  
  modelPersonType = new UserType();
  
  
  private userSubject = new BehaviorSubject<User>(this.modelPerson);
  user$ = this.userSubject.asObservable();

  constructor() {
    //this.modelPerson.userType = this.modelPersonType;
    //this.setUser(this.modelPerson);
    console.log("Inside constructor of UserServiceService");
   }

   setUser(user: User) {
    this.userSubject.next(user);
  }
}
