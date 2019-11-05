import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { Experience } from './experience';
import { ProfileService } from './profile.service';
import { User } from '../signup/User';

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
  user: User;
  
  constructor(private profileService: ProfileService) {
    /* this.profile = new Profile();
    this.experienceDefault = new Experience();

    this.profile.experienceArr = [this.experienceDefault];

    this.experience1.experienceName = "Exp1";
    this.experience2.experienceName = "Exp2";
    this.experience3.experienceName = "Exp3";

    this.experience1.roleName = "Role 1";
    this.experience2.roleName = "Role 2";
    this.experience3.roleName = "Role 3"; */
   }

  ngOnInit() {

    //this.profile.experienceArr = [this.experience1, this.experience2, this.experience3 ];
    this.profileService.getProfileforUser().subscribe(profile => {
      this.profile = profile;
      console.log("profile=" + JSON.stringify(this.profile));
      if(this.profile == null)
      {
        this.profile = new Profile();
        // this.profile.classOf = "test class";
        //this.experienceDefault = new Experience();
        //this.profile.experienceArr = [this.experienceDefault];
      }
    });
    this.user = this.profileService.user;
  }

  onSubmit() {
    console.log("onSubmit=>" + JSON.stringify(this.profile));
    console.log("onSubmit=>" + JSON.stringify(this.experienceDefault));
    if(this.profile.experienceArr == null)
    {
      console.log("exp is null 1");
      this.profile.experienceArr = [this.experienceDefault];
    }
    else {
      console.log("exp is not null 1");
      this.profile.experienceArr.push(this.experienceDefault);
    }
    
    this.profileService.saveProfile(this.profile).subscribe ( data => {
      this.profile = data;
      this.experienceDefault = new Experience();
      console.log("After response" + JSON.stringify(this.profile));
    });
  }
}
