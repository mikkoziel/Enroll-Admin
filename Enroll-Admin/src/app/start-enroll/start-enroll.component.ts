import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Enrollment } from '../interfaces/enrollment';
import { User } from '../interfaces/user';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-start-enroll',
  templateUrl: './start-enroll.component.html',
  styleUrls: ['./start-enroll.component.css']
})
export class StartEnrollComponent implements OnInit {
  modelForm: FormGroup = null;
  startDate: Date;

  constructor(
    private formBuilder : FormBuilder, 
    private serverService: ServerService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: {data: any, currentUser: User},
    public dialogRef: MatDialogRef<StartEnrollComponent>) { }

  ngOnInit(): void {
    this.startDate = new Date();
    this.modelForm = this.formBuilder.group({
      endDate: [this.startDate, [Validators.required]],
      endTime: [{hour: 12, minute: 0}, Validators.required],
    });
  }

  onSubmit(){
    let endDate = this.modelForm.value.endDate
    let time = this.modelForm.value.endTime
    endDate.setHours(time.hour, time.minute, 0)

    if(endDate.getTime()>this.startDate.getTime()){
      this.data.data.schedule.status = "ENROLLMENT";
      let enroll: Enrollment = <Enrollment>{
        schedule_id: this.data.data.schedule.id,
        startDate: this.datePipe.transform(this.startDate, 'dd/MM/yyyy HH:mm'),
        endDate: this.datePipe.transform(endDate, 'dd/MM/yyyy HH:mm')
      }
      this.serverService.startEnroll(this.data.currentUser.id, enroll).subscribe((x)=>{
        this.data.data.schedule = x;
      })
    }
    
    this.dialogRef.close(this.data.data);
  }

}
