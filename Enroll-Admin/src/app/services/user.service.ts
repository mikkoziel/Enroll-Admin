import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userObservable: Observable<User>;

  constructor() { }

  login(mail: string, password: string){
    let hashPassword: string = this.hashPassword(mail);
  }

  register(mail: string, password: string){

  }

  logout(){
    
  }

  hashPassword(password: string): string{
    return password;
  }
}
