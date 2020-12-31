import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class } from '../interfaces/class';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css']
})
export class NewClassComponent implements OnInit {
  modelForm: FormGroup;
  errors = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {schedule_id: number, cl: Class},
    private formBuilder : FormBuilder,
    public dialogRef: MatDialogRef<NewClassComponent>,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      full_name: ['', Validators.required]
    })

    if(this.data.cl != null){
      this.modelForm.setValue({
        name: this.data.cl.name,
        full_name: this.data.cl.full_name
      })
    }
  }

  onSubmit(modelForm: FormGroup){
    this.errors = [];

    if(modelForm.valid && modelForm.touched){
      let new_class = <Class>{
        name: modelForm.value.name,
        full_name: modelForm.value.full_name,
        groups: [],
        schedule_id: this.data.schedule_id
      }
      
      if(this.data.cl != null){
        this.onSubmitModify(new_class)
      } else {
        this.onSubmitAdd(new_class)
      }
    }else{
      this.getFormValidationErrors();
      if(this.errors.length == 0){
        this.errors.push("Fill all fields");
      }
    }
  }

  onSubmitAdd(new_class: any){
    this.serverService.addClass(1, new_class).subscribe(x=>{
      console.log(x)
      this.dialogRef.close(x);
    })
  }

  onSubmitModify(new_class: any){
    new_class.id = this.data.cl.id
    this.serverService.updateClass(1, new_class).subscribe(x=>{
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
