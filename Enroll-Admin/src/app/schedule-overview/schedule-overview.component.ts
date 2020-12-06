import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { Schedule } from '../interfaces/schedule'
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule-overview',
  templateUrl: './schedule-overview.component.html',
  styleUrls: ['./schedule-overview.component.css']
})
export class ScheduleOverviewComponent implements OnInit {
  schedules: Schedule[] = null;
  
  schedulesEmitter = new BehaviorSubject<Schedule[]>(this.schedules);

  constructor(private scheduleService: ScheduleService) { 
    this.getSchedules();
   }

  ngOnInit(): void {
  }

  getSchedules(): void {
    this.scheduleService.getSchedules().subscribe(sch =>{
      this.schedules = sch;
      console.log(this.schedules);
      this.schedulesEmitter.next(this.schedules);
    })
  }

}
