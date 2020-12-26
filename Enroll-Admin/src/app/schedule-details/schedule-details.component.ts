import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {MatDialog} from '@angular/material/dialog';

import { Professor } from '../interfaces/professor';
import { User } from '../interfaces/user';
import { UserSchedule } from '../interfaces/user-schedule';
import { ScheduleService } from '../services/schedule.service';
import { ServerService } from '../services/server.service';
import { StartEnrollComponent } from '../start-enroll/start-enroll.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { NewGroupComponent } from '../new-group/new-group.component';
import { NewClassComponent } from '../new-class/new-class.component';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {
  classpanelOpenState: boolean = false;
  userpanelOpenState: boolean = false;
  addUserPanelOpenState: boolean = false;
  id: number;
  sub: Subscription;  

  data: any;
  addClassesArr: Array<number> = [];
  currentUser: User;

  addUserFlag: boolean = false;
  allUsers: User[];

  minDate: Date;
  startEnroll: boolean = false;

  constructor(private _Activatedroute:ActivatedRoute,
    public dialog: MatDialog,
    private serverService: ServerService) { 
      this.minDate = new Date();
  }

  ngOnInit(): void {
    this.currentUser = <User> {id: 1};
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      this.serverService.getCombine(this.currentUser.id, this.id).subscribe((a:Professor[])=>{
        this.data = a;
      })
    });
  }

  deleteSchedule(){
    this.serverService.deleteSchedule(this.data.id)
  }

  updateSchedule(){

  }

  addClass(){
    const dialogRef = this.dialog.open(NewClassComponent, {
      width: '400px',
      data: {schedule_id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.data.users = result.users;
    });
  }

  hideNewClass(key: number){
    const index = this.addClassesArr.indexOf(key, 0);
    if (index > -1) {
      this.addClassesArr.splice(index, 1);
    }
  }

  openAddUser(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {id: this.id, users: this.data.users}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data.users = result.users;
    });
  }

  showEnrollment(){
    const dialogRef = this.dialog.open(StartEnrollComponent, {
      data: {data: this.data, currentUser: this.currentUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data.schedule = result.schedule;
    });
  }

  checkStartEnrollment(){
    return this.data.schedule.status!="CREATED";
  }

}
