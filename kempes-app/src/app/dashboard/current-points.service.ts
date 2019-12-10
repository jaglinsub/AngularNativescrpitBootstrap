import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentPointsService {
  currentPTS:number = 0;
  showPtsSystem : boolean;

  private currentPTSSubject = new BehaviorSubject<number>(this.currentPTS);
  currentPTSSubject$ = this.currentPTSSubject.asObservable();

  private showPtsSystemSubject = new BehaviorSubject<boolean>(this.showPtsSystem);
  showPtsSystemSubject$ = this.showPtsSystemSubject.asObservable();

  constructor() {
    console.log("Inside constructor of CurrentPointsService");
   }

  setCurrentPTS(currPTS: number) {
    this.currentPTSSubject.next(currPTS);
  }

  setShowPtsSystem(showPtsSystem: boolean) {
    this.showPtsSystemSubject.next(showPtsSystem);
  }
}
