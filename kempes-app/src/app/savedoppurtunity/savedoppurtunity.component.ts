import { Component, OnInit } from '@angular/core';
import { PoboxService } from '../pobox/pobox.service';
import { Opportunity } from '../pobox/Opportunity';

@Component({
  selector: 'app-savedoppurtunity',
  templateUrl: './savedoppurtunity.component.html',
  styleUrls: ['./savedoppurtunity.component.css']
})
export class SavedoppurtunityComponent implements OnInit {
  opportunities: Opportunity[];
  
  constructor(private poboxService: PoboxService) {
    
   }

  ngOnInit() {
    this.poboxService.getSavedOpportunities().subscribe (oppurs => {
      this.opportunities = oppurs;
      oppurs.forEach(oppur => {
        console.log("Complete saved opportunity= " + JSON.stringify(oppur));
        console.log("opportunity Name= " + oppur.opportunityName);        
      });      
    });
  }

}
