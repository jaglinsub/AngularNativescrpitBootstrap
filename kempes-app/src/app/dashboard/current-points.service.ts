import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentPointsService {
  currentPTS:number = 0;

  private currentPTSSubject = new BehaviorSubject<number>(this.currentPTS);
  currentPTSSubject$ = this.currentPTSSubject.asObservable();

  constructor() {
    console.log("Inside constructor of CurrentPointsService");
   }

  setCurrentPTS(currPTS: number) {
    this.currentPTSSubject.next(currPTS);
  }
}
