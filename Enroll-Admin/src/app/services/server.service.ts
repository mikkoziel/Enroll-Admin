import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Schedule } from '../interfaces/schedule';
import { Class } from '../interfaces/class';
import { Group } from '../interfaces/group';
import { Professor } from '../interfaces/professor';
import { UserSchedule } from '../interfaces/user-schedule';
import { User } from '../interfaces/user';

const httpOptions = { headers: new HttpHeaders({ 
  'Content-Type' : 'application/json',
  'Access-Control-Allow-Origin':'*', 
}) };

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  httpAddress = "http://localhost:3999/admin-handler";

  constructor(private http:HttpClient,) { 
  }

  // --GET------------------------------------------------------
  getSchedules() {
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '1'
    })};
    return this.http.get(this.httpAddress + "/schedules",
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToSchedules(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getSchedules'))
    )
  }

  getSchedule(schedule_id: number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '1'
    })};
    return this.http.get(this.httpAddress + "/schedules/" + schedule_id.toString(),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('getSchedule'))
    )
  }

  getProfessors() {
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '1'
    })};
    return this.http.get(this.httpAddress + "/professors",
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToProfessors(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getProfessors'))
    )
  }

  getUsersForSchedule(schedule_id: number) {
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '1'
    })};
    return this.http.get(this.httpAddress + "/users/" + schedule_id.toString(),
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToUsers(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getUsersForSchedule'))
    )
  }

  getUsers() {
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '1'
    })};
    return this.http.get(this.httpAddress + "/users",
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToUsers(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getUsers'))
    )
  }

  getCombine(user_id: number, schedule_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.get(this.httpAddress + "/combine/" + schedule_id.toString(),
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToCombine(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getUPForUser'))
    )
  }
  // --ADD------------------------------------------------------
  addSchedule(id:number, schedule: Schedule){
    // console.log(JSON.stringify(schedule))
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': id.toString()
    })};
    return this.http.post(this.httpAddress + "/schedules",
    JSON.stringify(schedule),
    header).pipe(
      tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addSchedule'))
    )
  }

  addClass(id:number, class_: Class){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': id.toString()
    })};
    return this.http.post(this.httpAddress + "/schedules/" + class_.schedule_id,
    JSON.stringify(class_),
    header).pipe(
      tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addClass'))
    )
  }

  addGroup(id:number, group: Group){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': id.toString()
    })};
    return this.http.post(this.httpAddress + "/classes/" + group.class_id,
    JSON.stringify(group),
    header).pipe(
      tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addGroup'))
    )

  }

  addUserToSchedule(us: UserSchedule){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.post(this.httpAddress + "/user-sch",
    JSON.stringify(us),
    header).pipe(
      tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      map((x)=> this.parseStringToUsers(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addUserToSchedule'))
    )
  }
  
  addProfessor(prof: Professor){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.post(this.httpAddress + "/prof",
    JSON.stringify(prof),
    header).pipe(
      tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addUsProfessor'))
    )
  }
  // --DELETE------------------------------------------------------
  deleteSchedule(schedule_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
    })};
    return this.http.post(this.httpAddress + "/schedules/" + schedule_id,
    header).pipe(
      tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addGroup'))
    )

  }

  // --UPDATE------------------------------------------------------
  updateSchedule(id:number, schedule: Schedule){
    // console.log(JSON.stringify(schedule))
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': id.toString()
    })};
    return this.http.put(this.httpAddress + "/schedules/" + schedule.id,
    JSON.stringify(schedule),
    header).pipe(
      tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addSchedule'))
    )
  }


  // --ERROR-----------------------------------------------------
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // --PARSER----------------------------------------------------
  parseStringToSchedules(schedules: any){
    let ret: Schedule[] = [];
    // console.log(schedules);
    // let sch = JSON.parse(schedules);
    schedules.schedules.forEach((schedule: any)=>{
      ret.push(this.parseStringToSchedule(schedule));
    });
    return ret;
  }

  parseStringToSchedule(schedule: any){
    return <Schedule>{
      id: schedule.scheduleID,
      name: schedule.name,
      status: schedule.status,
      semester: schedule.semester,
      description: schedule.description,
      classes: Array.from(schedule.classes, (cl: any) => 
        <Class>{
          id: cl.classId,
          name: cl.name,
          groups: Array.from(cl.groups, (group: any) =>
            <Group>{
              id: group.groupId,
              day: group.day,
              start: group.start,
              end: group.end,
              professor_id: group.professor_id
            }
          )   
      })
    };
  }

  parseStringToProfessors(profs: any){
    let ret: Professor[] = [];
    // console.log(professors);
    // let profs = JSON.parse(professors);
    profs.professors.forEach((professor: any)=>{
      ret.push(this.parseStringToProfessor(professor));
    });
    return ret;
  }

  parseStringToProfessor(professor: any){
    // console.log(professor)
    return <Professor>{
      id: professor.professor_id,
      name: professor.name,
      surname: professor.surname
    }
  }

  parseStringToUsers(users: any){
    let ret: User[] = [];
    // console.log(users);
    // let us = JSON.parse(users);
    users.users.forEach((user: any)=>{
      ret.push(this.parseStringToUser(user));
    });
    return ret;
  }
  
  parseStringToUser(user: any){
    // console.log(user)
    return <User>{
      id: user.user_id,
      name: user.name,
      surname: user.surname,
      mail: user.mail,
      admin: user.admin
    }
  }

  parseStringToCombine(comb: any){
    let data={};
    data["schedule"] = this.parseStringToSchedule(comb.schedule)
    data["profs"] = this.parseStringToProfessors({ "professors": comb.professors})
    data["users"] = this.parseStringToUsers({"users": comb.users})
    return data;
  }

}
