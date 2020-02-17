import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { EmailModelService } from './email-model.service';

@Component({
  selector: 'app-email-model',
  templateUrl: './email-model.component.html',
  styleUrls: ['./email-model.component.css']
})
export class EmailModelComponent implements OnInit {
  email: string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isValidFormSubmitted: boolean = false;

  constructor(private emailModelService: EmailModelService, public modalRef: MDBModalRef) { }

  ngOnInit() {
    console.log("Email Model init");
    // this.emailModelService.setModal(this.emailModel);
  }

  onEmailModelSubmit(parentEmailForm) {
    
    if (parentEmailForm.valid) {
      this.isValidFormSubmitted = false;
      this.emailModelService.saveParentEmail(this.email);
      this.modalRef.hide();
    }
    else {
      this.isValidFormSubmitted = true;
      return;
    }
  }

}
