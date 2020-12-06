import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { Schedule } from '../interfaces/schedule';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {
  modelForm: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private scheduleService: ScheduleService) { 

  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  onSubmit(modelForm: FormGroup){
    this.scheduleService.addSchedule(
      <Schedule>{
        id: 1,
      }
    )
  }

}
