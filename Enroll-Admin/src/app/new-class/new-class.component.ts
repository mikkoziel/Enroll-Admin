import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  @Input() component_id: number;
  @Input() schedule_id: number;
  @Output() hideEvent = new EventEmitter<number>();

  constructor(
    private formBuilder : FormBuilder,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit(modelForm: FormGroup){
    this.errors = [];
    // console.log(modelForm);

    if(modelForm.valid && modelForm.touched){
      let id_ob = this.serverService.addClass(1, 
              <Class>{
                name: modelForm.value.name,
                groups: [],
                schedule_id: this.schedule_id
              }
            )
      id_ob.subscribe(x=>console.log(x))
      this.hideNewClass();
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

  hideNewClass(){
    this.hideEvent.emit(this.component_id);
  }

}
