import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../interfaces/user';
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
    @Inject(MAT_DIALOG_DATA) public data: {schedule_id: number, users: User[]},
    private serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getUsers().subscribe((x:User[])=> {
      this.allUsers = x;
    })
  }

  checkIfUserAdded(user_id: number){
    return this.data.users.some((e) => e.id == user_id)
  }

  
  addUser(user_id: number){
    let us = <UserSchedule>{
      user_id: user_id,
      schedule_id: this.data.schedule_id,
      type: false
    }
    this.serverService.addUserToSchedule(us).subscribe((x:User[])=>{
      this.data.users=x;
    })
  }

}
