import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {
  modelForm: FormGroup;

  constructor(
    private formBuilder : FormBuilder,) { 

  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  onSubmit(modelForm: FormGroup){
    
  }

}
