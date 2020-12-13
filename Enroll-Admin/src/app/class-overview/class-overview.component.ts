import { Component, Input, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Class } from '../interfaces/class';
import { WeekDay } from '@angular/common';


@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.css']
})
export class ClassOverviewComponent implements OnInit {
  @Input() data: Class[];
  newGroup: boolean[];

  constructor() { }

  ngOnInit(): void {
    this.newGroup = [];
    this.initNewGroup()
  }

  getWeekDay(day: number){
    return WeekDay[day];
  }

  initNewGroup(){
    for (var i = 0; i < this.data?.length; i++) {
      this.newGroup.push(false);
    }
  }

  deleteGroup(id: any){

  }

  addGroup(i: string | number){
    if(!this.newGroup.length){
      this.initNewGroup()
    }
    // console.log(i)
    this.newGroup[i] = true;  
  }

  ifNewGroup(i: string | number){
    // console.log(this.newGroup)
    if(!this.newGroup.length){
      this.initNewGroup()
    }
    return this.newGroup[i];
  }

  hideNewGroup(i: string | number){
    this.newGroup[i] = false;
  }
}
