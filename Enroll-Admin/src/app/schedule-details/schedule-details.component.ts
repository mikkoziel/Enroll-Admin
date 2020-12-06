import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Schedule } from '../interfaces/schedule';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
export class ScheduleDetailsComponent implements OnInit {
  id: number;
  data: Schedule;
  sub: Subscription;

  constructor(private _Activatedroute:ActivatedRoute,
    private scheduleService: ScheduleService) { 
  
  }

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
    });
  }

  deleteSchedule(){
    this.scheduleService.deleteSchedule(this.data);
  }

}
