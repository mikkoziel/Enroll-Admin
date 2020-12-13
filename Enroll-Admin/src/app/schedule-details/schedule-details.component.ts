import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Class } from '../interfaces/class';
import { Schedule } from '../interfaces/schedule';
import { ScheduleService } from '../services/schedule.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {
  panelOpenState: boolean = false;
  id: number;
  data: Schedule;
  sub: Subscription;  
  classes: Array<number> = [];

  constructor(private _Activatedroute:ActivatedRoute,
    private scheduleService: ScheduleService, 
    private serverService: ServerService) { 
  
  }

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      this.serverService.getSchedule(this.id).subscribe((x: Schedule)=>{
        this.data = x;
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
