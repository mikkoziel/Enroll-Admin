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

  constructor() { }

  ngOnInit(): void {
  }

  getWeekDay(day: number){
    return WeekDay[day];
  }

  deleteGroup(id){

  }

  addGroup(){
    
  }

}
