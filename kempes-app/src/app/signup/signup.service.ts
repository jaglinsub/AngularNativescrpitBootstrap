import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './User';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from '../services/auth.service';

export class PersonTypes {
  id: number;
  personType: string;
}
export const PERSONTYPES: PersonTypes[] = [
  {
    "id": 1,
    personType: "Student"
  },
  {
    "id": 2,
    personType: "Councillor"
  },
  {
    "id": 3,
    personType: "Parent"
  }
];

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  user: User;
   //url: string = 'http://localhost:8080/api/user';
  url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/user';
  //authService: AuthService;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPersonTypes(): Observable<PersonTypes[]> {
    return of(PERSONTYPES);
  }

  saveUser(user: User): Observable<User> {
    let url = this.url + "/saveuser";
    return this.http.post<any>(url, user);
  }

async findUserByEmail(): Promise<Observable<User>> {
    
    //let email = this.authService.userDetails.providerData[0].email;
    let email = this.authService.fetchUserEmail();
    if (email) {
      let url = this.url + "/email";

      const options = email ? {
        params: new HttpParams().set('email', await email)
      } : {};
      console.log("Email=" + email);
      return this.http.get<User>(url, options);
    }
    else {
      console.log("Email is blank");
      return new Observable(user => { new User() } );
    }
  }

}

