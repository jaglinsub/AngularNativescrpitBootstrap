import { Component, OnInit } from '@angular/core';
import { Opportunity } from './Opportunity';
import { PoboxService } from './pobox.service';

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

  constructor(private poboxService: PoboxService) {

   
   }

  ngOnInit() {

    this.opportunity1 = new Opportunity();
    this.opportunity1.opportunityName = "Professional Opportunity 1";
    this.opportunity1.opportunityShortDesc = "Description of opportunity 1";

    this.opportunity2 = new Opportunity();
    this.opportunity2.opportunityName = "Professional Opportunity 2";
    this.opportunity2.opportunityShortDesc = "Description of opportunity 2";

    this.opportunity3 = new Opportunity();
    this.opportunity3.opportunityName = "Professional Opportunity 3";
    this.opportunity3.opportunityShortDesc = "Description of opportunity 3";

    // this.opportunities = [this.opportunity1, this.opportunity2, this.opportunity3];

    this.poboxService.getAllOpportunity().subscribe (oppurs => {
      this.opportunities = oppurs;

       this.poboxService.getSavedOpportunities().subscribe (savedlist => {
        
        oppurs.forEach(oppur => {
          console.log("Complete opportunity= " + JSON.stringify(oppur));
          console.log("opportunity Name= " + oppur.opportunityName);
          savedlist.forEach(savedoppur => {
            if(oppur.id == savedoppur.id) {
              oppur.isSaved = true;
              console.log("Oppurtunity id " + oppur.id + " is already saved!!");
            }
          });      
        }); 
         
        });
          
             
    });
  }

  saveOppurtunity(oppor : Opportunity) {
    
    console.log("Saving Opportunity = " + oppor.id);
    this.poboxService.saveOpportunityDetails(oppor.id).subscribe(savedOppur => {
      console.log("Completed saveOppurtunity= " + JSON.stringify(savedOppur));
      oppor.isSaved = true;
    });
  }

  dynamicStyle(oppor : Opportunity) {
    if(!oppor.isSaved) {
      return {
        color: 'rgba(2, 11, 62, 1)'
      };
    }
  }
}
