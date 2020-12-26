import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Class } from '../interfaces/class';
import { Professor } from '../interfaces/professor';
import { Schedule } from '../interfaces/schedule';
import { User } from '../interfaces/user';
import { UserSchedule } from '../interfaces/user-schedule';
import { ScheduleService } from '../services/schedule.service';
import { ServerService } from '../services/server.service';

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
  // users: User[];
  // professors: Professor[];
  currentUser: User;

  addUserFlag: boolean = false;
  allUsers: User[];

  minDate: Date;
  startEnroll: boolean = false;

  constructor(private _Activatedroute:ActivatedRoute,
    private scheduleService: ScheduleService, 
    private serverService: ServerService) { 
      this.minDate = new Date();
  }

  ngOnInit(): void {
    this.currentUser = <User> {id: 1};
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      // this.serverService.getSchedule(this.id).subscribe((x: Schedule)=>{
      //   this.data = x;
      //   this.serverService.getUsersForSchedule(this.id).subscribe((a:User[])=>{
      //     this.users = a;
      //   })
      //   this.serverService.getProfessors().subscribe((a:Professor[])=>{
      //     this.professors = a;
      //   })
      // })
      this.serverService.getCombine(this.currentUser.id, this.id).subscribe((a:Professor[])=>{
        this.data = a;
      })
    });
  }

  deleteSchedule(){
    // this.scheduleService.deleteSchedule(this.data);
    this.serverService.deleteSchedule(this.data.id)
  }

  updateSchedule(){

  }

  addClass(){
    this.addClassesArr.push(this.addClassesArr.length);
    console.log(this.addClassesArr)
  }

  hideNewClass(key: number){
    const index = this.addClassesArr.indexOf(key, 0);
    if (index > -1) {
      this.addClassesArr.splice(index, 1);
    }
  }

  openAddUser(){
    this.serverService.getUsers().subscribe((x:User[])=> {
      this.allUsers = x;
      this.addUserFlag= !this.addUserFlag;
    })
  }

  checkIfUserAdded(user_id: number){
    return this.data.users.some((e) => e.id == user_id)
  }

  addUser(user_id: number){
    let us = <UserSchedule>{
      user_id: user_id,
      schedule_id: this.id,
      type: false
    }
    this.serverService.addUserToSchedule(us).subscribe((x:User[])=>{
      this.data.users=x;
    })
  }

  showEnrollment(){
    this.startEnroll = !this.startEnroll;
  }

  checkStartEnrollment(){
    return this.data.schedule.status!="CREATED";
  }

}
