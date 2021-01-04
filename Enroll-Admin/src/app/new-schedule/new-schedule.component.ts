import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from '../interfaces/field';
import { Schedule } from '../interfaces/schedule';
import { User } from '../interfaces/user';
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

  fields: Field[] = [];

  currentUser: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {schedule: Schedule},
    private formBuilder : FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewScheduleComponent>,
    private serverService: ServerService) { 

  }

  ngOnInit(): void {
    this.currentUser = <User>{id:1};
    this.serverService.getFields(this.currentUser.id).subscribe((x:Field[])=>{
      this.fields = x;
    })

    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      semester: ['', Validators.required],
      description: ['', Validators.required],
      field_id: ['', Validators.required],
    })

    if(this.data.schedule != null){
      this.modelForm.setValue({
        name: this.data.schedule.name,
        semester: this.data.schedule.semester,
        description: this.data.schedule.description,
        field_id: this.data.schedule.field_id
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
        classes: [],
        field_id: modelForm.value.field_id
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
  
  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1 == object2;
  }
}
