import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { UserService } from '../services/user.service';
// import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mail: any;
  password: any;
  user = null;

  userEmitter = new BehaviorSubject(this.user);   

  constructor(
    // private authService: AuthService,
    // private wycieczkiService: WycieczkiServiceService,
    // private dbService: DbService
    private userService: UserService
    ) { }

  ngOnInit(): void {
    // this.getUser();
  }

  getUser(): void{
    // this.authService.getUserObs()
    // .subscribe((x: any)=> {
    //   console.log(x);
    //   this.assignAndEmmitUser(x);
    // });
  }

  assignAndEmmitUser(x:any){
    // if(x){
    //   this.user = x.mail;
    // }else{
    //   this.user = null;
    // }
    // this.userEmitter.next(this.user);
  }

  login(){
    this.userService.login(this.mail, this.password);
    // this.authService.login(this.mail, this.password)
  }

  logout(){
    this.userService.logout();
    // this.authService.logout()
  }

}
