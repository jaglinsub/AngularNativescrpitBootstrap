import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { UserServiceService } from '../services/user-service.service';
import { Interests } from './Interests';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  userId: string;
  url: string = 'http://localhost:8080/api/interests';
  //url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/interests';

  constructor(private http: HttpClient, private userService: UserServiceService) {
    this.userService.user$.subscribe((usr) => {
      
      console.log("InterestService::Cons::Logged in user id=" + usr.id);
      this.userId = usr.id;
    });
    console.log("cons: Logged in this.userId=" + this.userId);
   }

   findInterestforUser(): Observable<Interests> {
    this.userService.user$.subscribe((usr) => {
      console.log("findInterestforUser::Logged in user id=" + usr.id);
      this.userId = usr.id;
      console.log("Logged in this.userId=" + this.userId);
    });
    console.log("Logged in this.userId=" + this.userId);
      const options = {
        params: new HttpParams().set('userid', this.userId)
      };
      return this.http.get<Interests>(this.url, options);
  }

  saveInterests(interests: Interests): Observable<Interests> {
    let url = this.url + "/saveinterests";
    console.log("saveInterests::Logged in this.userId=" + this.userId);
    interests.userId = this.userId;
    return this.http.post<any>(url, interests);
  }
}
