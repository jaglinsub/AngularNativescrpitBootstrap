import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PointSystem } from './PointSystem';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrentPointsService {
  currentPTS: number = 0;
  showPtsSystem: boolean;
  pointSystem: PointSystem[];

  //url: string = 'http://localhost:8080/api/pointsystem';
  url: string = 'http://ec2-18-218-102-11.us-east-2.compute.amazonaws.com:8080/api/pointsystem';

  private currentPTSSubject = new BehaviorSubject<number>(this.currentPTS);
  currentPTSSubject$ = this.currentPTSSubject.asObservable();

  private showPtsSystemSubject = new BehaviorSubject<boolean>(this.showPtsSystem);
  showPtsSystemSubject$ = this.showPtsSystemSubject.asObservable();

  private pointSystemSubject = new BehaviorSubject<PointSystem[]>(this.pointSystem);
  pointSystemSubject$ = this.pointSystemSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log("Inside constructor of CurrentPointsService");
  }

  setCurrentPTS(currPTS: number) {
    this.currentPTSSubject.next(currPTS);
  }

  setShowPtsSystem(showPtsSystem: boolean) {
    this.showPtsSystemSubject.next(showPtsSystem);
  }

  setpointSystem(pointSystem: PointSystem[]) {
    this.pointSystemSubject.next(pointSystem);
  }

  getPointSystem(): Observable<PointSystem[]> {
    return this.http.get<PointSystem[]>(this.url);
  }
}
