import { Component, Input, OnInit } from '@angular/core';
import { Field } from '../interfaces/field';

@Component({
  selector: 'app-field-overview',
  templateUrl: './field-overview.component.html',
  styleUrls: ['./field-overview.component.css']
})
export class FieldOverviewComponent implements OnInit {
  @Input() fields: Field[];

  constructor() { }

  ngOnInit(): void {
  }

}
