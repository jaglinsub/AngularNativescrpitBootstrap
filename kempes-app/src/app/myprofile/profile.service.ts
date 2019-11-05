import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { UserServiceService } from '../services/user-service.service';
import { Profile } from './profile';
import { User } from '../signup/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: User;
  userId: string;
  //url: string = 'http://localhost:8080/api/profile';
  url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/profile';

  constructor(private http: HttpClient, private userService: UserServiceService) {
    this.userService.user$.subscribe((usr) => {
      this.user = usr;
      this.userId = usr.id;
    });
    console.log("Profile Cons: Logged in this.userId=" + this.userId);
   }

   getProfileforUser(): Observable<Profile> {
    this.userService.user$.subscribe((usr) => {
      console.log("getProfileforUser::Logged in user id=" + usr.id);
      this.user = usr;
      this.userId = usr.id;
      console.log("getProfileforUser::Logged in this.userId=" + this.userId);
    });
    console.log("getProfileforUser::Logged in this.userId=" + this.userId);
    const options = {
      params: new HttpParams().set('userid', this.userId)
    };
    return this.http.get<Profile>(this.url, options);
   }

   saveProfile(profile: Profile): Observable<Profile> {
    let url = this.url + "/saveprofile";
    console.log("saveProfile::Logged in this.userId=" + this.userId);
    profile.userId = this.userId;
    return this.http.post<any>(url, profile);
    // return new Observable<Profile>();
  }
}
