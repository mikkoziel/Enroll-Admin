import { Component, Input, OnInit } from '@angular/core';

import { Schedule } from '../interfaces/schedule'
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-schedule-overview',
  templateUrl: './schedule-overview.component.html',
  styleUrls: ['./schedule-overview.component.css']
})
export class ScheduleOverviewComponent implements OnInit {
  @Input() schedules: Schedule[];
  
  constructor(private serverService: ServerService) { 
  }

  ngOnInit(): void {
  }

}
