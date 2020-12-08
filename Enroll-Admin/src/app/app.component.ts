import { Component, OnInit } from '@angular/core';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Enroll-Admin';
  isMenuCollapsed = true;

  constructor(private serverService: ServerService){
    // this.serverService.getSchedules().subscribe(x=> console.log(x));  
  }

  ngOnInit(): void {

  }

}
