import { Component, OnInit } from '@angular/core';
import { Interests } from './Interests';
import { InterestOptions } from './InterestOptions';
import { InterestService } from './interest.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css'],
  providers: [InterestService],
})
export class InterestsComponent implements OnInit {
  interests: Interests;
  interestOptions: InterestOptions[];

  constructor(private interestService: InterestService, private router: Router, private userService: UserServiceService) {
   /*  this.interests  = new Interests();
    
    this.interestOptions = 
    [
      {id:'1',  interestQuestionName: 'QN1', interestQuestion: 'Q1', displayOrder:1 , answerOptions: [{id: 'A1', answerName: 'AN1', answerDescription: 'Ad1'}] },
      {id:'2',  interestQuestionName: 'QN2', interestQuestion: 'Q2', displayOrder:2 , answerOptions: [{id: 'A2', answerName: 'AN2', answerDescription: 'Ad2'}] },
      {id:'3',  interestQuestionName: 'QN3', interestQuestion: 'Q3', displayOrder:3 , answerOptions: [{id: 'A3', answerName: 'AN3', answerDescription: 'Ad3'}] }

    ];
    this.interests.interestOptions = this.interestOptions; */

   }

  ngOnInit() {
    this.interestService.findInterestforUser().subscribe(interests => {
      this.interests = interests;
      console.log("Interest=" + JSON.stringify(this.interests));
    });
  }

  onSubmit() {
    console.log("onSubmit=>" + JSON.stringify(this.interests));
    this.interestService.saveInterests(this.interests).subscribe ( data => {
      this.interests = data;
      this.userService.setInterests(data);
      console.log("After response" + JSON.stringify(this.interests));
      this.router.navigate(['portfolio/pobox']);
    });
  }
}
