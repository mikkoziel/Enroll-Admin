import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {MatDialog} from '@angular/material/dialog';

import { Professor } from '../interfaces/professor';
import { User } from '../interfaces/user';
import { ServerService } from '../services/server.service';
import { StartEnrollComponent } from '../start-enroll/start-enroll.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { NewClassComponent } from '../new-class/new-class.component';
import { NewScheduleComponent } from '../new-schedule/new-schedule.component';

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
    private router: Router,
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
    this.serverService.deleteSchedule(this.id).subscribe(result=>{
      console.log(result)
      this.router.navigateByUrl('/admin');
      // this.deleteSEvent.emit(this.data.id)
    })
  }

  updateSchedule(){
    const dialogRef = this.dialog.open(NewScheduleComponent, {
      data: { schedule: this.data.schedule }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        console.log(result)
        this.data.schedule = result
        // this.schedules.push(result);
       }
    });  
  }

  addClass(){
    const dialogRef = this.dialog.open(NewClassComponent, {
      width: '400px',
      data: {schedule_id: this.id, cl: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        console.log(result)
        this.data.schedule.classes.push(result)
      }
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
      data: {schedule_id: this.id, 
        users: this.data.users, 
        field_id: null, 
        requests: this.data.requests}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != null){
        this.data.users = result.users;
      }
    });
  }

  showEnrollment(){
    const dialogRef = this.dialog.open(StartEnrollComponent, {
      data: {data: this.data, currentUser: this.currentUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != null){
        this.data.schedule = result.schedule;
      }
    });
  }

  checkStartEnrollment(){
    return this.data.schedule.status!="CREATED";
  }

}
