import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Class } from '../interfaces/class';
import { Professor } from '../interfaces/professor';
import { Schedule } from '../interfaces/schedule';
import { User } from '../interfaces/user';
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
  id: number;
  sub: Subscription;  

  data: any;
  classes: Array<number> = [];
  // users: User[];
  // professors: Professor[];
  currentUser: User;

  constructor(private _Activatedroute:ActivatedRoute,
    private scheduleService: ScheduleService, 
    private serverService: ServerService) { 
  
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
    this.classes.push(this.classes.length);
    console.log(this.classes)
  }

  hideNewClass(key: number){
    const index = this.classes.indexOf(key, 0);
    if (index > -1) {
      this.classes.splice(index, 1);
    }
  }

}
