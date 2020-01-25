import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POBoxDetailsService } from './pobox-details.service';
import { Opportunity } from '../pobox/Opportunity';
import { OpportunityDetails } from '../pobox/OpportunityDetails';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { isNull, isUndefined } from 'util';
import { PoboxService } from '../pobox/pobox.service';

@Component({
  selector: 'app-poboxdetails',
  templateUrl: './poboxdetails.component.html',
  styleUrls: ['./poboxdetails.component.css']
})
export class PoboxdetailsComponent implements OnInit {
  oppurtunityId: string;
  opportunity: Opportunity;
  opportunityDetails: OpportunityDetails;
  image: SafeUrl;
  

  constructor(private activatedRoute: ActivatedRoute, private poboxService: PoboxService, private pOBoxDetailsService: POBoxDetailsService, private sanitizer: DomSanitizer) {
    this.oppurtunityId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.oppurtunityId = this.activatedRoute.snapshot.params['id'];
    this.pOBoxDetailsService.getOpportunityDetails(this.oppurtunityId).subscribe(oppur => {
      this.opportunity = oppur;
      this.opportunityDetails = this.opportunity.opportunityDetails;
      console.log("Complete Opportunity on details load= " + JSON.stringify(this.opportunity));
      console.log("Complete Opportunity Details on details load= " + JSON.stringify(this.opportunityDetails));

      //if url from server is Null, assumption is byte array of the image is available
      //else use the url from server
      console.log("this.opportunityDetails.organizationURL= " + this.opportunityDetails.organizationURL);
      if (oppur.opportunityDetails.organizationImage) {
        // if (isUndefined(this.opportunityDetails.organizationURL) || isNull(this.opportunityDetails.organizationURL)) {
        let objectURL = 'data:image/png;base64,' + oppur.opportunityDetails.organizationImage;
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.opportunityDetails.organizationURL = this.image;
      }
      else {
        // this.opportunityDetails.organizationURL = "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/612830d463dc8a90bb5ae256f71144f4";
      }
      // console.log("Image URL= " + this.image);

      this.poboxService.getSavedOpportunities().subscribe (oppurs => {
        
        oppurs.forEach(oppur => {
          if(this.oppurtunityId == oppur.id) {
            this.opportunity.isSaved = true;
            console.log("Oppurtunity id " + this.oppurtunityId + " is already saved!!");
          }
        });      
      });
    });
  }

  saveOppurtunity() {
    this.pOBoxDetailsService.saveOpportunityDetails(this.oppurtunityId).subscribe(savedOppur => {
      console.log("Completed saveOppurtunity= " + JSON.stringify(savedOppur));
      this.opportunity.isSaved = true;
    });
  }
}
