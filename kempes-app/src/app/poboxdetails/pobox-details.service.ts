import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Opportunity } from '../pobox/Opportunity';
import { SavedOpportunities } from './SavedOpportunities';
import { User } from '../signup/User';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class POBoxDetailsService {
  user: User;
  userId: string;
  
  //url: string = 'http://localhost:8080/api/opportunity/';
  url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/opportunity/';

  constructor(private http: HttpClient, private userService: UserServiceService) {
    this.userService.user$.subscribe((usr) => {
      this.user = usr;
      this.userId = usr.id;
    });
    console.log("POBoxDetailsService Cons: Logged in this.userId=" + this.userId);

   }

  getOpportunityDetails(id: string): Observable<Opportunity> {

    const options = id ? {
      params: new HttpParams().set('id', id)
    } : {};
    console.log("Id @ getOpportunityDetails= " + id);
    return this.http.get<Opportunity>((this.url + "id"), options);
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
