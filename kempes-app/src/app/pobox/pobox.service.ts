import { Injectable } from '@angular/core';
import { Opportunity } from './Opportunity';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from '../signup/User';
import { UserServiceService } from '../services/user-service.service';
import { SavedOpportunities } from '../poboxdetails/SavedOpportunities';

@Injectable({
  providedIn: 'root'
})
export class PoboxService {

  user: User;
  userId: string;
  
  //url: string = 'http://localhost:8080/api/opportunity/';
  url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/opportunity/';

  constructor(private http: HttpClient, private userService: UserServiceService) {
    this.userService.user$.subscribe((usr) => {
      this.user = usr;
      this.userId = usr.id;
    });
    console.log("POBoxService Cons: Logged in this.userId=" + this.userId);

   }

  getAllOpportunity(): Observable<Opportunity[]> {    
    return this.http.get<Opportunity[]>(this.url);
   }

   getSavedOpportunities(): Observable<Opportunity[]> {    
    let url = this.url + "savedopportunities";
    const options = {
      params: new HttpParams().set('userid', this.userId)
    };
    return this.http.get<Opportunity[]>(url, options);
   }

   saveOpportunityDetails(oppurId: string): Observable<SavedOpportunities> {

    let url = this.url + "saveuseropportunities";
    console.log("saveOpportunityDetails::Logged in this.userId=" + this.userId);

    let saveOpportunityDetail = new SavedOpportunities();
    saveOpportunityDetail.oppurtunityId = oppurId;
    saveOpportunityDetail.userId = this.userId;

    return this.http.post<any>(url, saveOpportunityDetail);
  }
}
