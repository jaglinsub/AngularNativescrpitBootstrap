import { Component, OnInit } from '@angular/core';
import { Opportunity } from './Opportunity';
import { PoboxService } from './pobox.service';
import { CurrentPointsService } from '../dashboard/current-points.service';
import { EmailModelComponent } from '../email-model/email-model.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

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
  modalRef: MDBModalRef;

  constructor(private poboxService: PoboxService, private currentPointsService: CurrentPointsService,
    private modalService: MDBModalService) {


  }

  openModal() {
    this.modalRef = this.modalService.show(EmailModelComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-dialog-centered modal-lg',
      containerClass: 'right',
      animated: true
    });
  }

  ngAfterViewInit() {
    
  }
  ngOnInit() {    

    this.currentPointsService.setShowPtsSystem(false);

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

    this.poboxService.getAllOpportunity().subscribe(oppurs => {
      this.opportunities = oppurs;

      this.poboxService.getSavedOpportunities().subscribe(savedlist => {

        oppurs.forEach(oppur => {
          console.log("Complete opportunity= " + JSON.stringify(oppur));
          console.log("opportunity Name= " + oppur.opportunityName);
          savedlist.forEach(savedoppur => {
            if (oppur.id == savedoppur.id) {
              oppur.isSaved = true;
              console.log("Oppurtunity id " + oppur.id + " is already saved!!");
            }
          });
        });

      });
    });

    this.openModal();
    this.modalService.open.subscribe(() => console.log('open'));
    this.modalService.opened.subscribe(() => console.log('opened'));
    this.modalService.close.subscribe(() => console.log('close'));
    this.modalService.closed.subscribe(() => console.log('closed'));
  }

  saveOppurtunity(oppor: Opportunity) {
    console.log("Saving Opportunity = " + oppor.id);
    this.poboxService.saveOpportunityDetails(oppor.id).subscribe(savedOppur => {
      console.log("Completed saveOppurtunity= " + JSON.stringify(savedOppur));
      oppor.isSaved = true;
    });
  }

  dynamicStyle(oppor: Opportunity) {
    if (!oppor.isSaved) {
      return {
        color: 'rgba(2, 11, 62, 1)'
      };
    }
  }
}
