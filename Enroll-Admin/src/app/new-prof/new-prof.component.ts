import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Professor } from '../interfaces/professor';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-new-prof',
  templateUrl: './new-prof.component.html',
  styleUrls: ['./new-prof.component.css']
})
export class NewProfComponent implements OnInit {
  modelForm: FormGroup;
  errors = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    public dialogRef: MatDialogRef<NewProfComponent>,
    private formBuilder : FormBuilder,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      prof_title: ['', [Validators.required]],
      prof_name: ['', [Validators.required]],
      prof_surname: ['', [Validators.required]]
    })
  }

  onSubmit(){
    let new_prof = <Professor>{
      name: this.modelForm.value.prof_name,
      surname: this.modelForm.value.prof_surname,
      title: this.modelForm.value.prof_title
    }
    this.serverService.addProfessor(new_prof).subscribe(x=>{
      // console.log(x)
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
