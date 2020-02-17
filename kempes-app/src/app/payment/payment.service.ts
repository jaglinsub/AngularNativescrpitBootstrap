import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IntentSecrets } from './IntentSecrets';
import { PaymentDetails } from './paymentDetails';
import { SubscriptionDetails } from './SubscriptionDetails';
import { User } from "../signup/User";
import { PaymentPlans } from "./PaymentPlans";
import { ParentUser } from "../parent/ParentUser";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: string = 'http://localhost:8080/api/payments';
  // url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/payments';

  parentURL: string = 'http://localhost:8080/api/parent';
  // parentURL: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/parent';
  
  constructor(private http: HttpClient) {
  }

  getPaymentPlans(): Observable<PaymentPlans[]> {
    let url = this.url + "/plans";
    return this.http.get<PaymentPlans[]>(url);
  }

  getStudents(parentid: string): Observable<User[]> {
    let parentUrl = this.parentURL + "/students";
    const options = {
      params: new HttpParams().set('id', parentid)
    };
    return this.http.get<User[]>(parentUrl, options);
  }

  getIntentSecret(): Promise<IntentSecrets> {
    let url = this.url + "/intentsecret";
    let secret: string;
    return this.http.get<IntentSecrets>(url).toPromise();
    // this.http.get<IntentSecrets>(url).toPromise().then (data => {
    //   secret = data.secret;
    //   console.log("intentSecret inside getIntentSecret=" + secret);
    //   return secret;
    // });
    // console.log("getIntentSecret before returning=" + secret);
    // return secret;
  }

  createParent(parUser: ParentUser): Observable<ParentUser> {
    let parentUrl = this.parentURL + "/createParent";
    return this.http.post<any>(parentUrl, parUser);
  }

  createSubscription(paymentDetails: PaymentDetails): Observable<SubscriptionDetails> {
    let url = this.url + "/createSubscription";
    return this.http.post<SubscriptionDetails>(url, paymentDetails);
  }

  getSubscription(subscriptionId: string): Observable<SubscriptionDetails> {
    let url = this.url + "/subscription";
    const options = {
      params: new HttpParams().set('subId', subscriptionId)
    };
    return this.http.get<SubscriptionDetails>(url, options);
  }

  updateCard(paymentDetails: PaymentDetails): Observable<SubscriptionDetails> {
    let url = this.url + "/updateCard";
    return this.http.post<SubscriptionDetails>(url, paymentDetails);
  }
}
