import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Field } from '../interfaces/field';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-new-field',
  templateUrl: './new-field.component.html',
  styleUrls: ['./new-field.component.css']
})
export class NewFieldComponent implements OnInit {
  modelForm: FormGroup;
  errors = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {field: Field},
    private formBuilder : FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewFieldComponent>,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      short_name: ['', Validators.required],
      start_year: ['', Validators.required],
      cycle: ['', Validators.required],
    })
    
    if(this.data.field != null){
      this.modelForm.setValue({
        name: this.data.field.name,
        short_name: this.data.field.short_name,
        start_year: this.data.field.start_year,
        cycle: this.data.field.cycle
      })
    }
  }

  onSubmit(){
    this.errors = [];

    if(this.modelForm.valid && this.modelForm.touched){
      let new_field = <Field>{
        name: this.modelForm.value.name,
        short_name: this.modelForm.value.short_name,
        start_year: this.modelForm.value.start_year,
        cycle: this.modelForm.value.cycle,
      }
      if(this.data.field != null){
        this.onSubmitModify(new_field)
      } else {
        this.onSubmitAdd(new_field)
      }
    }else{
      this.getFormValidationErrors();
      if(this.errors.length == 0){
        this.errors.push("Fill all fields");
      }
    }
  }

  onSubmitAdd(new_field: Field){
    this.serverService.addFoS(1, new_field).subscribe(x=>{
      console.log(x)
      this.dialogRef.close(x);
    })
  }
  
  onSubmitModify(new_field: Field){
    new_field.field_id = this.data.field.field_id
    this.serverService.updateFoS(1, new_field).subscribe(x=>{
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
