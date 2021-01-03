import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Field } from '../interfaces/field';
import { Schedule } from '../interfaces/schedule';
import { User } from '../interfaces/user';
import { NewScheduleComponent } from '../new-schedule/new-schedule.component';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  panelOpenState: boolean = true;
  fieldOpenState: boolean = false;

  schedules: Schedule[] = null;
  fields: Field[] = null;

  currentUser: User;

  constructor(private serverService: ServerService,
    public dialog: MatDialog,) {
    
    this.currentUser = <User>{id: 1}
    // this.serverService.getSchedules(this.currentUser.id).subscribe((x: Schedule[])=> {
    //   this.schedules = x; 
    // });  
    // this.serverService.getFields(this.currentUser.id).subscribe((x: Field[])=>{
    //   this.fields = x;
    // });
        
    this.serverService.getFieldsSchedules(this.currentUser.id).subscribe((x: any)=>{
      this.schedules = x.schedules;
      this.fields = x.fields;
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

  addNewFieldOfStudy(){

  }

}
