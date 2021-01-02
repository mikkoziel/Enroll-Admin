import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: {schedule: Schedule},
    private formBuilder : FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewScheduleComponent>,
    private serverService: ServerService) { 

  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      semester: ['', Validators.required],
      description: ['', Validators.required],
    })

    if(this.data.schedule != null){
      this.modelForm.setValue({
        name: this.data.schedule.name,
        semester: this.data.schedule.semester,
        description: this.data.schedule.description
      })
    }
  }

  onSubmit(modelForm: FormGroup){
    this.errors = [];

    if(modelForm.valid && modelForm.touched){
      let new_schedule = <Schedule>{
        name: modelForm.value.name,
        status: "CREATED",
        semester: modelForm.value.semester,
        description: modelForm.value.description,
        classes: []
      }
      if(this.data.schedule != null){
        this.onSubmitModify(new_schedule)
      } else {
        this.onSubmitAdd(new_schedule)
      }
    }else{
      this.getFormValidationErrors();
      if(this.errors.length == 0){
        this.errors.push("Fill all fields");
      }
    }
  }
  
  onSubmitAdd(new_schedule: any){
    this.serverService.addSchedule(1, new_schedule).subscribe(x=>{
      console.log(x)
      this.dialogRef.close(x);
    })
  }
  
  onSubmitModify(new_schedule: any){
    new_schedule.id = this.data.schedule.id
    this.serverService.updateSchedule(1, new_schedule).subscribe(x=>{
      console.log(x)
      this.dialogRef.close(x);
    })
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
