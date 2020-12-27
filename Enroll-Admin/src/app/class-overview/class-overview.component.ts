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
    this.serverService.deleteGroup(group_id).subscribe(x=>{
      console.log(x)
      if(x>0){
        // cl.groups.splice()
        // this.data.schedule.classes.find((x: Class)=> x.id == cl.id).groups.filter(a=> {
        //   a.id !== group_id;
        // });
      }
    })
  }

  addGroup(id: number){ 
    const dialogRef = this.dialog.open(NewGroupComponent, {
      width: '400px',
      data: {class_id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data.schedule.classes.find((x: Class)=> x.id == id).groups.push(result);
    });
  }

  getProfessor(index: number){
    let prof = this.data.profs.filter(i=> i.id == index)[0];
    return prof?.title + " " + prof?.surname + " " + prof?.name;
  }
}
