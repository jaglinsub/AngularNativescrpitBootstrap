import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './User';
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from '../services/auth.service';
import { ParentUser } from '../parent/ParentUser';

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
  url: string = 'http://localhost:8080/api/user';
  // url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/user';

  urlParent: string = 'http://localhost:8080/api/parent';
  // urlParent: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/parent';

  //authService: AuthService;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPersonTypes(): Observable<PersonTypes[]> {
    return of(PERSONTYPES);
  }

  saveUser(user: User): Observable<User> {
    let url = this.url + "/saveuser";
    return this.http.post<any>(url, user);
  }

  async findUserByEmailId(emailId: string): Promise<Observable<User>> {
    if (emailId) {
      let url = this.url + "/email";

      const options = {
        params: new HttpParams().set('email', emailId)
      };
      console.log("Email=" + emailId);
      return this.http.get<User>(url, options);
    }
  }

  async findParenByEmailId(emailId: string): Promise<Observable<ParentUser>> {
    if (emailId) {
      let urlParent = this.urlParent + "/email";

      const options = {
        params: new HttpParams().set('email', emailId)
      };
      console.log("Email=" + emailId);
      return this.http.get<ParentUser>(urlParent, options);
    }
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

  async findUserById(id: string): Promise<Observable<User>> {
    
    if (id) {
      let url = this.url + "/";

      const options = id ? {
        params: new HttpParams().set('id', await id)
      } : {};
      console.log("id=" + id);
      return this.http.get<User>(url, options);
    }
    else {
      console.log("Id is blank");
      return new Observable(user => { new User() } );
    }
  }

}

