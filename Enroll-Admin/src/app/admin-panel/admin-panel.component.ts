import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Schedule } from '../interfaces/schedule';
import { NewScheduleComponent } from '../new-schedule/new-schedule.component';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  panelOpenState: boolean = false;
  schedules: Schedule[] = null;

  constructor(private serverService: ServerService,
    public dialog: MatDialog,) {
    this.serverService.getSchedules().subscribe((x: Schedule[])=> {
      this.schedules = x; 
    });  
  }

  ngOnInit(): void {
  }

  addSchedule(){
    const dialogRef = this.dialog.open(NewScheduleComponent, {
      data: { schedule: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        this.schedules.push(result);
       }
    });    
  }

}
