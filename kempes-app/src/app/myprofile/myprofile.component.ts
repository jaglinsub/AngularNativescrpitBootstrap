import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Profile } from './profile';
import { Experience } from './experience';
import { ProfileService } from './profile.service';
import { User } from '../signup/User';
import { UserServiceService } from '../services/user-service.service';
import { Interests } from '../interests/Interests';
import { InterestOptions } from '../interests/InterestOptions';
import { CurrentPointsService } from '../dashboard/current-points.service';
import { PointSystem } from '../dashboard/PointSystem';
import { stringify } from 'querystring';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyprofileComponent implements OnInit {
  profile: Profile;
  interests: Interests;
  intOptions: InterestOptions;
  afterSchool: string;
  pointSystem: PointSystem[];
  
  experienceDefault = new Experience();
  experience1 = new Experience();
  experience2 = new Experience();
  experience3 = new Experience();
  user: User;
  showNewExp: boolean;

  CAROUSEL_BREAKPOINT = 1280;
  carouselDisplayMode = 'multiple';
  slides: any = [[]];

  games = [{ "title_id": 1, "title_name": "MIssion Impossible", "title_img": "https://media.services.cinergy.ch/media/box1600/f1323e57a2c4ea79dde779a89d561f85bfbe6bf5.jpg", "genres": [{ "id": 1, "name": "Action" }, { "id": 2, "name": "Adventure" }] }, { "title_id": 2, "title_name": "Matrix", "title_img": "https://www.sideshowtoy.com/assets/products/903302-neo/lg/the-matrix-neo-sixth-scale-figure-hot-toys-903302-01.jpg", "genres": [{ "id": 1, "name": "Action" }, { "id": 2, "name": "Adventure" }, { "id": 6, "name": "Fantasy" }] }, { "title_id": 3, "title_name": "Avengers", "title_img": "http://media.comicbook.com/2018/03/avengers-infinity-war-poster-all-iron-man-version-1096449.jpeg", "genres": [{ "id": 1, "name": "Action" }, { "id": 2, "name": "Adventure" }, { "id": 6, "name": "Fantasy" }] }, { "title_id": 4, "title_name": "Stargate SG-1", "title_img": "https://image.tmdb.org/t/p/w300_and_h450_bestv2/rst5xc4f7v1KiDiQjzDiZqLtBpl.jpg", "genres": [{ "id": 1, "name": "Action" }, { "id": 5, "name": "Drama" }, { "id": 2, "name": "Adventure" }, { "id": 9, "name": "Sci Fi" }] }, { "title_id": 5, "title_name": "Scooby Doo", "title_img": "https://images-na.ssl-images-amazon.com/images/G/01/aplusautomation/vendorimages/1cdd3ea2-f14f-416b-9aaa-644a9a01ad8c.jpg._CB321085566_.jpg", "genres": [{ "id": 1, "name": "Action" }, { "id": 10, "name": "Thriller" }, { "id": 6, "name": "Fantasy" }] }];
  gamesFormatted = [];
  mobile = false;
  showNavigationArrows = true;

  monthList = [
    { value: '1', text: 'Jan' },
    { value: '2', text: 'Feb' },
    { value: '3', text: 'Mar' },
    { value: '4', text: 'Apr' },
    { value: '5', text: 'May' },
    { value: '6', text: 'June' },
    { value: '7', text: 'July' },
    { value: '8', text: 'Aug' },
    { value: '9', text: 'Sep' },
    { value: '10', text: 'Oct' },
    { value: '11', text: 'Nov' },
    { value: '12', text: 'Dec' }
  ];

  monthList1 = [
    { value: 'Jan', text: 'Jan' },
    { value: 'Feb', text: 'Feb' },
    { value: 'Mar', text: 'Mar' },
    { value: 'Apr', text: 'Apr' },
    { value: 'May', text: 'May' },
    { value: 'June', text: 'June' },
    { value: 'July', text: 'July' },
    { value: 'Aug', text: 'Aug' },
    { value: 'Sep', text: 'Sep' },
    { value: 'Oct', text: 'Oct' },
    { value: 'Nov', text: 'Nov' },
    { value: 'Dec', text: 'Dec' }
  ];

  yearList = [];


  cards = [
    {
      title: 'Card Title 1',
      description: 'Collective Health',
      buttonText: 'Button',
      // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
      // img: "../../assets/Logo_1_A31_Rectangle_125_pattern.png"
      img: '../../assets/scene80.jpg',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 2',
      description: 'Collective Health',
      buttonText: 'Button',
      img: 'https://i.pinimg.com/474x/8a/6d/6d/8a6d6dfcc676b70fee598d2990ae4306--tree-logos-retro-logos.jpg',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 3',
      description: 'Collective Health',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 4',
      description: 'Collective Health',
      buttonText: 'Button',
      // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
      // img: '../../assets/Logo_1_A31_Rectangle_125_pattern.png'
      img: '../../assets/scene.jpg',
      loc: 'San Francisco CA'
      // img: 'https://i.pinimg.com/474x/8a/6d/6d/8a6d6dfcc676b70fee598d2990ae4306--tree-logos-retro-logos.jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Collective Health',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 6',
      description: 'Collective Health',
      buttonText: 'Button',
      img: '../../assets/sample_pharmacy.png',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 7',
      description: 'Collective Health',
      buttonText: 'Button',
      // img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
      img: '../../assets/Logo_1_A31_Rectangle_125_pattern.png',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 8',
      description: 'Collective Health',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 9',
      description: 'Collective Health',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
      loc: 'San Francisco CA'
    },
    {
      title: 'Card Title 10',
      description: 'Collective Health',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
      loc: 'San Francisco CA'
    },

  ];

  constructor(private profileService: ProfileService, private userService: UserServiceService, private currentPointsService: CurrentPointsService) {
    /* this.profile = new Profile();
    this.experienceDefault = new Experience();

    this.profile.experienceArr = [this.experienceDefault];

    this.experience1.experienceName = "Exp1";
    this.experience2.experienceName = "Exp2";
    this.experience3.experienceName = "Exp3";

    this.experience1.roleName = "Role 1";
    this.experience2.roleName = "Role 2";
    this.experience3.roleName = "Role 3"; */

    this.userService.interest$.subscribe((ints) => {
      this.interests = ints;
    });
    console.log("Profile comp::Cons::Interests =" + JSON.stringify(this.interests));

    //InterestOptions
    this.intOptions = this.interests.interestOptions.find(x => x.interestQuestionName.includes('After I graduate high school'));
    console.log("Profile comp::Cons::InterestOption =" + JSON.stringify(this.intOptions));
    this.afterSchool = this.intOptions.selectedOptions;
    console.log("Profile comp::Cons::afterSchool =" + this.afterSchool);

    for (let i = new Date().getFullYear(); i >= (new Date().getFullYear() - 10); i--) {
      let newYear = {
        name: i.toString(),
        value: i.toString()
      };
      this.yearList.push(newYear);
    }
    // this.yearList.sort((a,b) => 0 - (b > a ? 1 : -1));
  }

  ngOnInit() {

    this.currentPointsService.setShowPtsSystem(true);

    this.currentPointsService.pointSystemSubject$.subscribe((ptsSystem) => {
      this.pointSystem = ptsSystem;
    });

    //this.profile.experienceArr = [this.experience1, this.experience2, this.experience3 ];
    this.profileService.getProfileforUser().subscribe(profile => {
      this.profile = profile;
      console.log("profile=" + JSON.stringify(this.profile));
      if (this.profile == null) {
        this.profile = new Profile();
        this.profile.highSchoolName = this.user.organizationName;
      }
      this.updateTotalPoints();
    });
    this.user = this.profileService.user;

    this.slides = this.chunk(this.cards, 2);



    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }

    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }

    var j = -1;

    for (var i = 0; i < this.games.length; i++) {
      if (i % 3 == 0) {
        j++;
        this.gamesFormatted[j] = [];
        this.gamesFormatted[j].push(this.games[i]);
      }
      else {
        this.gamesFormatted[j].push(this.games[i]);
      }
    }
    console.log("Formatted Games= " + JSON.stringify(this.gamesFormatted));

    
  }


  onSubmit() {
    console.log("onSubmit=>" + JSON.stringify(this.profile));
    console.log("onSubmit=>" + JSON.stringify(this.experienceDefault));

    this.profileService.saveProfile(this.profile).subscribe(data => {
      this.profile = data;
      this.experienceDefault = new Experience();
      
      console.log("After response" + JSON.stringify(this.profile));
    });

    this.updateTotalPoints();
  }

  editExperience(exp: Experience) {
    console.log("Experience editing ON= " + exp.experienceName);
    exp.isEditMode = !exp.isEditMode;
  }

  showhideNewExp(exp: Experience) {

    this.showNewExp = !this.showNewExp;
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

  saveNewExperience() {

    if (this.profile.experienceArr == null) {
      console.log("exp is null 1");
      this.profile.experienceArr = [this.experienceDefault];
    }
    else {
      console.log("exp is not null 1");
      this.profile.experienceArr.splice(0, 0, this.experienceDefault);
    }

    this.profileService.saveProfile(this.profile).subscribe(data => {
      this.profile = data;
      this.experienceDefault = new Experience();
      this.showhideNewExp(this.experienceDefault);
      console.log("After saving individual exp = " + JSON.stringify(this.profile));
    });

    this.updateTotalPoints();
  }
  
  saveExperience(exp: Experience) {
    this.profileService.saveProfile(this.profile).subscribe(data => {
      this.profile = data;
      this.experienceDefault = new Experience();
      console.log("After saving individual exp = " + JSON.stringify(this.profile));
    });
    exp.isEditMode = !exp.isEditMode;
    this.updateTotalPoints();
  }

  cancelExperienceEdit(exp: Experience) {
    console.log("Experience editing OFF= " + exp.experienceName);
    exp.isEditMode = !exp.isEditMode;
  }

  onActivityTypeChange(newValue: string, exp: Experience) {
    
    let ptsSys = this.pointSystem.find(item => item.activityName == newValue);
    exp.activityPoint = ptsSys.activityPoint;
    console.log("onActivityTypeChange= " + newValue + " and it's point is= " + exp.activityPoint);
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    console.log("chunks= " + JSON.stringify(R));
    return R;
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }
}


