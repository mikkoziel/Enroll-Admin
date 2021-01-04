import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddUserComponent } from '../add-user/add-user.component';
import { User } from '../interfaces/user';
import { NewFieldComponent } from '../new-field/new-field.component';
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
    public dialog: MatDialog,
    private router: Router,
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
    const dialogRef = this.dialog.open(NewFieldComponent, {
      data: { field: this.data.field }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        console.log(result)
        this.data.field = result
        // this.schedules.push(result);
       }
    });  

  }

  deleteFoS(){
    this.serverService.deleteFoS(this.id).subscribe(result=>{
      console.log(result)
      this.router.navigateByUrl('/admin');
    })
  }

  openAddUser(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {schedule_id: null, users: this.data.users, field_id: this.id, requests: this.data.requests}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result != null){
        this.data.users = result.users;
        this.data.requests = result.requests;
      }
    });
  }

}
