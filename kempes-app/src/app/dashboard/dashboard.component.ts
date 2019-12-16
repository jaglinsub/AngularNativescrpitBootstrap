import { Component, OnInit } from '@angular/core';
import { CurrentPointsService } from './current-points.service';
import { PointSystem } from './PointSystem';
import { ProfileService } from '../myprofile/profile.service';
import { Profile } from '../myprofile/profile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile: Profile;
  currentPTS:number = 0;
  showPtsSystem : boolean = false;
  pointSystem: PointSystem[];

  constructor(private currentPointsService: CurrentPointsService, private profileService: ProfileService) {

    this.currentPointsService.currentPTSSubject$.subscribe((pts) => {
      this.currentPTS = pts;
    });

    this.currentPointsService.showPtsSystemSubject$.subscribe((show) => {
      console.log("DashboardComponent Cons: show= " + show);
      this.showPtsSystem = show;
    });
    console.log("DashboardComponent Cons: Current points= " + this.currentPTS);
    console.log("DashboardComponent Cons: showPtsSystem= " + this.showPtsSystem);

   }

  ngOnInit() {
    this.currentPointsService.getPointSystem().subscribe(ptsSystem => {
      this.pointSystem = ptsSystem;
      this.pointSystem = this.sortedPointSystem;
      this.currentPointsService.setpointSystem(this.pointSystem);
      
      console.log("DashboardComponent ngOnInit: ptsSystem= " + JSON.stringify(ptsSystem));
      console.log("DashboardComponent ngOnInit: PointSystem 1= " + JSON.stringify(this.pointSystem));
    });
    console.log("DashboardComponent ngOnInit: PointSystem 2= " + JSON.stringify(this.pointSystem));

    this.profileService.getProfileforUser().subscribe(profile => {
      this.profile = profile;
      console.log("profile=" + JSON.stringify(this.profile));
      if (this.profile == null) {
        this.profile = new Profile();
      }
      this.updateTotalPoints();
    });
  }

  updateTotalPoints() {

    let totalPts = 0;
    if (this.profile.experienceArr != null) {
      for(var i = 0, len = this.profile.experienceArr.length; i < len; i++) {
        if(this.profile.experienceArr[i].activityPoint) {
          totalPts = totalPts + Number(this.profile.experienceArr[i].activityPoint);
          console.log("updating totalPts=" + totalPts);
        }
      }
    }

    console.log("Total Points totalPts=" + totalPts);
    if(totalPts) {
      this.currentPointsService.setCurrentPTS(totalPts);
    }
    else {
      this.currentPointsService.setCurrentPTS(0);
    }    
  }

  get sortedPointSystem() {
    return this.pointSystem.sort((a, b) => {
      return -1 * (<any>(b.displayOrder) - <any>(a.displayOrder));
    });
  }
}
