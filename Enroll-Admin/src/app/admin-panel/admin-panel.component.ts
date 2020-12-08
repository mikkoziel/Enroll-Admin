import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  panelOpenState: boolean = false;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
  }

  schedules(){
    
  }

}
