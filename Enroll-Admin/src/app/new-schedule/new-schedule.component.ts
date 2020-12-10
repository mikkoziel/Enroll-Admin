import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { Schedule } from '../interfaces/schedule';
import { ScheduleService } from '../services/schedule.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {
  modelForm: FormGroup;
  errors = [];

  constructor(
    private formBuilder : FormBuilder,
    private scheduleService: ScheduleService,
    private serverService: ServerService) { 

  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      semester: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmit(modelForm: FormGroup){
    this.errors = [];

    if(modelForm.valid && modelForm.touched){
      let id_ob = this.serverService.addSchedule(1, 
              <Schedule>{
                name: modelForm.value.name,
                status: "CREATED",
                semester: modelForm.value.semester,
                description: modelForm.value.description,
                classes: []
              }
            )
        id_ob.subscribe(x=>console.log(x))
    }else{
      this.getFormValidationErrors();
      if(this.errors.length == 0){
        this.errors.push("Fill all fields");
      }
    }
  }

  getFormValidationErrors() {
    Object.keys(this.modelForm.controls).forEach(key => {
  
    const controlErrors: ValidationErrors = this.modelForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            this.errors.push("Wrong value in " + key + " field")
          });
        }
      });
  }
  
}
