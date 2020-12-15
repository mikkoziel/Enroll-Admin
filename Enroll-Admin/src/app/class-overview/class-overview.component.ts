import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Class } from '../interfaces/class';
import { WeekDay } from '@angular/common';
import { Professor } from '../interfaces/professor';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.css']
})
export class ClassOverviewComponent implements OnInit {
  @Input() data: Class[];
  @Input() profs: Professor[];
  newGroup: boolean[];

  profs_subject: BehaviorSubject<Professor>[];

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

  ngOnChanges(changes: SimpleChanges) {
    // if(changes["profs"].currentValue != undefined){
    //   this.profs.forEach((p:Professor)=> {
    //     this.profs_subject.push(new BehaviorSubject<Professor>(p))
    //   })
    // }
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

  getProfessor(index: number){
    let prof = this.profs.filter(i=> i.id == index)[0];
    return prof?.surname + " " + prof?.name;
  }
}
