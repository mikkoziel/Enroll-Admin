import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.css']
})
export class ClassOverviewComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
