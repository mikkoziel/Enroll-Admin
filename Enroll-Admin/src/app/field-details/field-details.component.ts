import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/user';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css']
})
export class FieldDetailsComponent implements OnInit {
  data: any;

  id: number;
  sub: Subscription;  
  
  currentUser: User;

  usersOpenState: boolean = false;
  
  constructor(private _Activatedroute:ActivatedRoute,
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.currentUser = <User> {id: 1};
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = Number(params.get('id')); 
      this.serverService.getFieldDetails(this.currentUser.id, this.id).subscribe((a: any)=>{
        this.data = a;
      })
    });    
  }

  updateFoS(){

  }

  deleteFoS(){

  }

}
