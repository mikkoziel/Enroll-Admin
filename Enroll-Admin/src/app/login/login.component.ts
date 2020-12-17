import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
// import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modelForm: FormGroup;
  currentUser: User = null;

  // userEmitter = new BehaviorSubject(this.user);   

  constructor(
    private formBuilder : FormBuilder,
    // private authService: AuthService,
    // private wycieczkiService: WycieczkiServiceService,
    // private dbService: DbService
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      mail: ['', Validators.required],
      password: ['', Validators.required]
    })
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
    this.userService.login(this.modelForm.value.mail, this.modelForm.value.password);
    // this.authService.login(this.mail, this.password)
  }

  logout(){
    this.userService.logout();
    // this.authService.logout()
  }

}
