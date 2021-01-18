import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Class } from '../interfaces/class';
import { WeekDay } from '@angular/common';
import { Professor } from '../interfaces/professor';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewGroupComponent } from '../new-group/new-group.component';
import { ServerService } from '../services/server.service';
import { NewClassComponent } from '../new-class/new-class.component';


@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.css']
})
export class ClassOverviewComponent implements OnInit {
  @Input() data: any;

  profs_subject: BehaviorSubject<Professor>[];

  constructor(
    public dialog: MatDialog,
    private serverService: ServerService) { }

  ngOnInit(): void {
  }

  getWeekDay(day: number){
    return WeekDay[day];
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  deleteGroup(cl:Class, group_id: any){
    this.serverService.deleteGroup(group_id).subscribe(result=>{
      console.log(result)
      let res_json= JSON.parse(JSON.stringify(result))
      console.log(res_json)
      if(res_json.deleted>0){
        console.log("Tutaj")
        let class_index = this.getClassIndex(cl.id);
        this.data.schedule.classes[class_index].groups.filter(a=> 
          a.id !== group_id
        );
        console.log(this.data.schedule.classes[class_index])
      }
    })
  }

  modifyGroup(cl:Class, group: any){
    const dialogRef = this.dialog.open(NewGroupComponent, {
      width: '400px',
      data: {class_id: cl.id, group: group}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        let class_index = this.getClassIndex(cl.id);
        let group_index = this.getGroupIndex(class_index, result.id)
        this.data.schedule.classes[class_index].groups[group_index] = result
      }
    });
  }

  modifyClass(cl: any){
    const dialogRef = this.dialog.open(NewClassComponent, {
      width: '400px',
      data: {schedule_id: this.data.schedule.id, cl: cl}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        let class_index = this.getClassIndex(cl.id);
        // result.groups = this.data.schedule.classes[class_index].groups
        this.data.schedule.classes[class_index] = result
      }
    });
  }

  deleteClass(class_id: any){
    this.serverService.deleteClass(class_id).subscribe(result=>{
      let res_json= JSON.parse(JSON.stringify(result))
      if(res_json.deleted>0){
        this.data.schedule.classes = this.data.schedule.classes.filter((a: Class)=>{
          return a.id!=class_id;
        })
      }
    })
  }

  addGroup(id: number){ 
    const dialogRef = this.dialog.open(NewGroupComponent, {
      width: '400px',
      data: {class_id: id, group: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        this.data.schedule.classes.find((x: Class)=> x.id == id).groups.push(result);
      }
    });
  }

  getProfessor(index: number){
    let prof = this.data.profs.filter(i=> i.id == index)[0];
    return prof?.title + " " + prof?.surname + " " + prof?.name;
  }

  getClassIndex(class_id: number){
    let class_index = -1;
    for(var i = 0; i < this.data.schedule.classes.length; i += 1) {
      if(this.data.schedule.classes[i].id === class_id) {
        class_index= i;
      }
    }
    return class_index;
  }

  getGroupIndex(class_index: number, result_id: number){
    let group_index = -1;
    for(var i = 0; i < this.data.schedule.classes[class_index].groups.length; i += 1) {
      if(this.data.schedule.classes[class_index].groups[i].id === result_id) {
        group_index= i;
      }
    }
    return group_index;
  }

  
  checkStatus(){
    return this.data.schedule.status=="CREATED";
  }
}
