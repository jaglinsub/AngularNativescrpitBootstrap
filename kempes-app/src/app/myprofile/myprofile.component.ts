import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { Experience } from './experience';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  profile : Profile;
  experienceDefault = new Experience();
  experience1 = new Experience();
  experience2 = new Experience();
  experience3 = new Experience();

  constructor() {
    this.profile = new Profile();
    this.experienceDefault = new Experience();

    this.profile.experienceArr = [this.experienceDefault];

    this.experience1.experienceName = "Exp1";
    this.experience2.experienceName = "Exp2";
    this.experience3.experienceName = "Exp3";

    this.experience1.roleName = "Role 1";
    this.experience2.roleName = "Role 2";
    this.experience3.roleName = "Role 3";
   }

  ngOnInit() {
    this.profile.experienceArr = [this.experience1, this.experience2, this.experience3 ];
  }
}
