import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './User';
import {HttpClient} from "@angular/common/http";

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
  // url: string = 'http://localhost:8080/api/user/saveuser';
  url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/user/saveuser';

  constructor(private http: HttpClient) { }

  getPersonTypes(): Observable<PersonTypes[]> {
    return of(PERSONTYPES);
  }

  saveUser(user : User): Observable<User> {
    let url = this.url;
    return this.http.post<any>(url, user);
  }

}

