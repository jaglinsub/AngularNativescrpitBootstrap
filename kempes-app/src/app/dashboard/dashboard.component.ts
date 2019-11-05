import { Component, OnInit } from '@angular/core';
import { CurrentPointsService } from './current-points.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentPTS:number = 0;
  constructor(private currentPointsService: CurrentPointsService) {

    this.currentPointsService.currentPTSSubject$.subscribe((pts) => {
      this.currentPTS = pts;
    });
    console.log("DashboardComponent Cons: Current points=" + this.currentPTS);

   }

  ngOnInit() {
  }

}
