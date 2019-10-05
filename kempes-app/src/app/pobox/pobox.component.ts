import { Component, OnInit } from '@angular/core';
import { Opportunity } from './Opportunity';

@Component({
  selector: 'app-pobox',
  templateUrl: './pobox.component.html',
  styleUrls: ['./pobox.component.css']
})
export class PoboxComponent implements OnInit {
  opportunities: Opportunity[];
  opportunity1: Opportunity;
  opportunity2: Opportunity;
  opportunity3: Opportunity;

  constructor() {
    this.opportunity1 = new Opportunity();
    this.opportunity1.opportunityName = "Professional Opportunity 1";
    this.opportunity1.opportunityShortDesc = "Description of opportunity 1";

    this.opportunity2 = new Opportunity();
    this.opportunity2.opportunityName = "Professional Opportunity 2";
    this.opportunity2.opportunityShortDesc = "Description of opportunity 2";

    this.opportunity3 = new Opportunity();
    this.opportunity3.opportunityName = "Professional Opportunity 3";
    this.opportunity3.opportunityShortDesc = "Description of opportunity 3";

    this.opportunities = [this.opportunity1, this.opportunity2, this.opportunity3];
   }

  ngOnInit() {
  }

}
