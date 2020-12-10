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
    for (var i = 0; i < this.data?.length; i++) {
      this.newGroup.push(false);
    }
  }

  getWeekDay(day: number){
    return WeekDay[day];
  }

  deleteGroup(id){

  }

  addGroup(i){
    this.newGroup[i] = true;    
  }

  ifNewGroup(i){
    return this.newGroup[i];
  }

  hideNewGroup(i){
    this.newGroup[i] = false;
  }
}
