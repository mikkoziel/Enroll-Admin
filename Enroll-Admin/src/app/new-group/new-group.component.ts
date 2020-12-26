import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../interfaces/group';
import { Professor } from '../interfaces/professor';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  modelForm: FormGroup;
  errors = [];
  // @Input() class_id: number;
  // @Output() hideGroupEvent = new EventEmitter<boolean>();
  professors: Professor[] = [];
  profpanelOpenState: boolean = false;

  // profsEmitter = new BehaviorSubject<Professor[]>(this.professors); 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {class_id: number},
    private formBuilder : FormBuilder,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getProfessors().subscribe((x:Professor[])=>{
      this.professors = x;
      // this.profsEmitter.next(x);
    })

    this.modelForm = this.formBuilder.group({
      day: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      professor_id: ['', Validators.required],
    })
  }

  onSubmit(){
    this.errors = [];

    if(this.modelForm.valid && this.modelForm.touched){
      let id_ob = this.serverService.addGroup(1, 
              <Group>{
                day: this.modelForm.value.day,
                start: this.modelForm.value.start,
                end: this.modelForm.value.end,
                professor_id: this.modelForm.value.description,
                class_id: this.data.class_id
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
