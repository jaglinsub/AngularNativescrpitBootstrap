import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { IntentSecrets } from './IntentSecrets';
import { PaymentDetails } from './paymentDetails';
import { SubscriptionDetails } from './SubscriptionDetails';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: string = 'http://localhost:8080/api/payments';
  // url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/payments';
  constructor(private http: HttpClient) { }

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

   createSubscription(paymentDetails: PaymentDetails) : Observable<SubscriptionDetails> {
    let url = this.url + "/createSubscription";
    return this.http.post<SubscriptionDetails>(url, paymentDetails);
   }
}
