import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from '../interfaces/group';
import { Professor } from '../interfaces/professor';
import { NewProfComponent } from '../new-prof/new-prof.component';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  modelForm: FormGroup;
  errors = [];

  professors: Professor[] = [];
  profpanelOpenState: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {class_id: number},
    private formBuilder : FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewGroupComponent>,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getProfessors().subscribe((x:Professor[])=>{
      this.professors = x;
    })

    this.modelForm = this.formBuilder.group({
      day: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      type: ['', Validators.required],
      professor_id: ['', Validators.required]
    })
  }

  onSubmit(){
    this.errors = [];

    if(this.modelForm.valid && this.modelForm.touched){
      let new_group = <Group>{
        day: this.modelForm.value.day,
        start: this.modelForm.value.start,
        end: this.modelForm.value.end,
        professor_id: this.modelForm.value.professor_id,
        class_id: this.data.class_id,
        type: this.modelForm.value.type
      }
        this.serverService.addGroup(1, new_group).subscribe(x=>{
          console.log(x)
          this.dialogRef.close(x);
        })

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

  addProf(){
    const dialogRef = this.dialog.open(NewProfComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.professors.push(result);
      this.modelForm.controls['professor_id'].setValue(result.id);
    });
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1 == object2;
  }
}
