import { Component, OnInit } from '@angular/core';
import { CareerGoals } from './CareerGoals';
import { CurrentPointsService } from '../dashboard/current-points.service';

@Component({
  selector: 'app-careerchecklist',
  templateUrl: './careerchecklist.component.html',
  styleUrls: ['./careerchecklist.component.css']
})
export class CareerchecklistComponent implements OnInit {
  careerGoals: CareerGoals;
  
  
  constructor(private currentPointsService: CurrentPointsService) { }

  ngOnInit() {
    this.careerGoals = new CareerGoals();
    this.careerGoals.careerCheckList = 
    [
      {id:'1', checkListTitle:'Getting Started...', displayOrder:1, careerCheckListItems: [
          {id:'1', checkListItemTitle:'GS Checklist item 1', points:1, displayOrder:1, isSelected:false},
          {id:'2', checkListItemTitle:'GS Checklist item 2', points:2, displayOrder:2, isSelected:true},
          {id:'3', checkListItemTitle:'GS Checklist item 3', points:3, displayOrder:3, isSelected:false},
          {id:'4', checkListItemTitle:'GS Checklist item 4', points:4, displayOrder:4, isSelected:false},
          {id:'5', checkListItemTitle:'GS Checklist item 5', points:5, displayOrder:5, isSelected:false},
          {id:'6', checkListItemTitle:'GS Checklist item 6', points:6, displayOrder:6, isSelected:false}
        ], subTotals: 1
      },
      {id:'2', checkListTitle:'Getting Involved...', displayOrder:2, careerCheckListItems: [
        {id:'1', checkListItemTitle:'GI Checklist item 1', points:1, displayOrder:1, isSelected:false},
        {id:'2', checkListItemTitle:'GI Checklist item 2', points:2, displayOrder:2, isSelected:false},
        {id:'3', checkListItemTitle:'GI Checklist item 3', points:3, displayOrder:3, isSelected:false},
        {id:'4', checkListItemTitle:'GI Checklist item 4', points:4, displayOrder:4, isSelected:true},
        {id:'5', checkListItemTitle:'GI Checklist item 5', points:5, displayOrder:5, isSelected:false},
        {id:'6', checkListItemTitle:'GI Checklist item 6', points:6, displayOrder:6, isSelected:false}
        ], subTotals: 2
      },
      {id:'3', checkListTitle:'Getting Experience...', displayOrder:3, careerCheckListItems: [
        {id:'1', checkListItemTitle:'GE Checklist item 1', points:1, displayOrder:1, isSelected:true},
        {id:'2', checkListItemTitle:'GE Checklist item 2', points:2, displayOrder:2, isSelected:false},
        {id:'3', checkListItemTitle:'GE Checklist item 3', points:3, displayOrder:3, isSelected:false},
        {id:'4', checkListItemTitle:'GE Checklist item 4', points:4, displayOrder:4, isSelected:true},
        {id:'5', checkListItemTitle:'GE Checklist item 5', points:5, displayOrder:5, isSelected:false},
        {id:'6', checkListItemTitle:'GE Checklist item 6', points:6, displayOrder:6, isSelected:false}
        ], subTotals: 3
      }
    ]
    //this.careerGoals.careerCheckList[0].careerCheckListItems[0].checkListItemTitle

    this.calculatePoints();
  }

  onSubmit() {
    console.log("onSubmit=>" + JSON.stringify(this.careerGoals));
  }

  changeCheckbox(x, i) {
      this.careerGoals.careerCheckList[x].careerCheckListItems[i].isSelected = !this.careerGoals.careerCheckList[x].careerCheckListItems[i].isSelected;
      console.log("Value changed" + 
    this.careerGoals.careerCheckList[x].careerCheckListItems[i].checkListItemTitle + " - " +
      this.careerGoals.careerCheckList[x].careerCheckListItems[i].isSelected);

      this.calculatePoints();
  }

  calculatePoints() {
    var pts:number = 0;
    this.careerGoals.careerCheckList.forEach(chklist => {
      chklist.careerCheckListItems.forEach(listitems => {
        if(listitems.isSelected) {
          pts = pts + listitems.points
        }
      })        
    });
    console.log("Current Points= " + pts);
    this.careerGoals.currentPoints = pts;
    this.currentPointsService.setCurrentPTS(pts);
  }

}
