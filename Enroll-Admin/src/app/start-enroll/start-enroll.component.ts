import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollment } from '../interfaces/enrollment';
import { User } from '../interfaces/user';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-start-enroll',
  templateUrl: './start-enroll.component.html',
  styleUrls: ['./start-enroll.component.css']
})
export class StartEnrollComponent implements OnInit {
  @Input() data:any;
  @Input() currentUser: User;
  @Output() submitItemEvent = new EventEmitter<boolean>();
  
  modelForm: FormGroup = null;
  startDate: Date;

  constructor(
    private formBuilder : FormBuilder, 
    private serverService: ServerService,
    private datePipe: DatePipe) { }

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
    // console.log("Tutaj")

    if(endDate.getTime()>this.startDate.getTime()){
      // console.log("Tutaj2")
      this.data.schedule.status = "ENROLLMENT";
      // console.log(this.data)
      let enroll: Enrollment = <Enrollment>{
        schedule_id: this.data.schedule.id,
        startDate: this.datePipe.transform(this.startDate, 'dd/MM/yyyy HH:mm'),
        endDate: this.datePipe.transform(endDate, 'dd/MM/yyyy HH:mm')
      }
      // console.log(enroll)
      this.serverService.startEnroll(this.currentUser.id, enroll).subscribe((x)=>{
        this.data.schedule = x;
      })
    }
    
    this.submitItemEvent.emit(true);
  }

}
