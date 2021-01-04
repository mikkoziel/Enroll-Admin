import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../interfaces/user';
import { UserField } from '../interfaces/user-field';
import { UserSchedule } from '../interfaces/user-schedule';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  allUsers: User[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {schedule_id: number, field_id: number, users: User[], requests: User[]},
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getUsers().subscribe((x:User[])=> {
      this.allUsers = x;
    })
  }

  checkButton(user_id: number){
    if(this.data.users.some((e) => e.id == user_id)){
      return "DELETE";
    } else if(this.data.requests.some((e) => e.id == user_id)){
      return "REQUEST";
    } else {
      return "NONE";
    }
  }
  
  addUser(user_id: number){
    if(this.data.schedule_id != null){
      let us = <UserSchedule>{
        user_id: user_id,
        schedule_id: this.data.schedule_id,
        type: "STUDENT"
      }
      this.serverService.addUserToSchedule(us).subscribe((x:User[])=>{
        this.data.users=x;
      })
    } else if(this.data.field_id != null){
      let uf = <UserField>{
        user_id: user_id,
        field_id: this.data.field_id,
        type: "STUDENT"
      }
      this.serverService.addUserToFoS(uf).subscribe((x:User[])=>{
        this.data.users=x;
        // this.data.requests = this.data.requests.filter(a=> a.id != user_id)
      })
    }
  }

  confirmUser(user_id: number){
    if(this.data.schedule_id != null){
      let us = <UserSchedule>{
        user_id: user_id,
        schedule_id: this.data.schedule_id,
        type: "STUDENT"
      }
      this.serverService.updateUsertoSchedule(us).subscribe((x:User[])=>{
        this.data.users=x;      
        this.data.requests = this.data.requests.filter(a=> a.id != user_id)
      })
    } else if(this.data.field_id != null){
      let uf = <UserField>{
        user_id: user_id,
        field_id: this.data.field_id,
        type: "STUDENT"
      }
      this.serverService.updateUsertoFoS(uf).subscribe((x:User[])=>{
        this.data.users=x;
        this.data.requests = this.data.requests.filter(a=> a.id != user_id)
      })
    }

  }

  deleteUser(user_id: number){
    if(this.data.schedule_id != null){
      this.serverService.deleteUserSchedule(this.data.schedule_id, user_id).subscribe((x:any)=>{
        if(x?.deleted>0){
          this.data.users = this.data.users.filter(a=> a.id != user_id)
        }
      })
    } else if(this.data.field_id != null){
      this.serverService.deleteUserField(this.data.field_id, user_id).subscribe((x:any)=>{
        if(x?.deleted>0){
          this.data.users = this.data.users.filter(a=> a.id != user_id)
        }
      })
    }

  }
}
