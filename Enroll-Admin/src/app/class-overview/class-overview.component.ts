import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Class } from '../interfaces/class';
import { WeekDay } from '@angular/common';
import { Professor } from '../interfaces/professor';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewGroupComponent } from '../new-group/new-group.component';


@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.css']
})
export class ClassOverviewComponent implements OnInit {
  @Input() data: any;
  
  profs_subject: BehaviorSubject<Professor>[];

  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getWeekDay(day: number){
    return WeekDay[day];
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  deleteGroup(id: any){

  }

  addGroup(id: number){ 
    const dialogRef = this.dialog.open(NewGroupComponent, {
      width: '400px',
      data: {class_id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.data.users = result.users;
    });
  }

  getProfessor(index: number){
    let prof = this.data.profs.filter(i=> i.id == index)[0];
    return prof?.surname + " " + prof?.name;
  }
}
