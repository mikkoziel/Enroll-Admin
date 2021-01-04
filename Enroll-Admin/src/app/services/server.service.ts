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
import { Enrollment } from '../interfaces/enrollment';
import { Field } from '../interfaces/field';
import { UserField } from '../interfaces/user-field';

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
  getSchedules(user_id: number) {
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
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

  getFields(user_id: number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.get(this.httpAddress + "/fields",
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToFields(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getFields'))
    )
  }

  getFieldsSchedules(user_id: number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.get(this.httpAddress + "/fields-schedules",
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToFieldsSchedules(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getFieldsSchedules'))
    )
  }

  getFieldDetails(user_id: number, field_id: number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.get(this.httpAddress + "/field-details/" + field_id.toString(),
      header).pipe(
        // tap(x=> console.log(x)),
        map((x)=> this.parseStringToFieldsDetails(JSON.parse(JSON.stringify(x)))),
        catchError(this.handleError('getFieldsSchedules'))
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
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToSchedule(JSON.parse(JSON.stringify(x)))),
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
      // tap(x=> console.log(x)),
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
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToGroup(JSON.parse(JSON.stringify(x)))),
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
      // tap(x=> console.log(x)),
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
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToProfessor(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addUsProfessor'))
    )
  }

  addFoS(user_id: number, fos: Field){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.post(this.httpAddress + "/fos",
    JSON.stringify(fos),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToField(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addFoS'))
    )
  }
  
  addUserToFoS(uf: UserField){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.post(this.httpAddress + "/user-field",
    JSON.stringify(uf),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToUsers(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addFoS'))
    )
  }
  // --DELETE------------------------------------------------------
  deleteSchedule(schedule_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.delete(this.httpAddress + "/schedules/" + schedule_id,
    header).pipe(
      // tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('deleteSchedule'))
    )
  }

  deleteClass(class_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.delete(this.httpAddress + "/classes/" + class_id,
    header).pipe(
      // tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('deleteClass'))
    )
  }

  deleteGroup(group_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.delete(this.httpAddress + "/groups/" + group_id,
    header).pipe(
      // tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('deleteGroup'))
    )
  }

  deleteFoS(field_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.delete(this.httpAddress + "/fos/" + field_id,
    header).pipe(
      // tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('deleteFoS'))
    )
  }

  deleteUserField(field_id:number, user_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.delete(this.httpAddress + "/user-field/" + field_id.toString(),
    header).pipe(
      // tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('deleteUserField'))
    )
  }

  deleteUserSchedule(schedule_id:number, user_id:number){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.delete(this.httpAddress + "/user-sch/" + schedule_id.toString(),
    header).pipe(
      // tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('deleteUserSchedule'))
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
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToSchedule(JSON.parse(JSON.stringify(x)))),
      // map(x=> this.parseDelete(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addSchedule'))
    )
  }

  startEnroll(id:number, enroll: Enrollment){
    // console.log(JSON.stringify(schedule))
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': id.toString()
    })};
    return this.http.put(this.httpAddress + "/enroll",
    JSON.stringify(enroll),
    header).pipe(
      // tap(x=> console.log(x)),
      // map(x=> this.parseSchedule(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addSchedule'))
    )
  }

  updateClass(schedule_id:number, cl: Class){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.put(this.httpAddress + "/classes/" + schedule_id,
    JSON.stringify(cl),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToClass(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('updateClass'))
    )
  }

  updateGroup(class_id:number, group: Group){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.put(this.httpAddress + "/groups/" + class_id,
    JSON.stringify(group),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToGroup(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('updateGroup'))
    )
  }

  updateUsertoSchedule(us: UserSchedule){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.put(this.httpAddress + "/user-sch",
    JSON.stringify(us),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToUsers(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addFoS'))
    )
  }

  updateFoS(user_id:number, fos: Field){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': user_id.toString()
    })};
    return this.http.put(this.httpAddress + "/fos",
    JSON.stringify(fos),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToField(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('updateFoS'))
    )
  }
  
  updateUsertoFoS(uf: UserField){
    const header = { headers: new HttpHeaders({
      'responseType': 'text',
      'id': '0'
    })};
    return this.http.put(this.httpAddress + "/user-field",
    JSON.stringify(uf),
    header).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseStringToUsers(JSON.parse(JSON.stringify(x)))),
      catchError(this.handleError('addFoS'))
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
        this.parseStringToClass(cl)),
      field_id: schedule.field_id
    };
  }

  parseStringToClass(cl:any){
    return <Class>{
      id: cl.classId,
      name: cl.name,
      full_name: cl.full_name,
      groups: Array.from(cl.groups, (group: any) =>
        this.parseStringToGroup(group)
      ) 
    }
  }

  parseStringToGroup(group: any){
    return <Group>{
      id: group.groupId,
      day: group.day,
      start: group.start,
      end: group.end,
      professor_id: group.professor_id,
      type: group.type
    }
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
      surname: professor.surname,
      title: professor.title
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
    data["users"] = this.parseStringToUsers({"users": comb.users}),  
    data["requests"] = this.parseStringToUsers({"users": comb.requests});
    return data;
  }

  parseDelete(a: any){
    return a.deleted;
  }

  parseStringToFields(fields: any){
    let ret: Field[] = [];
    fields.fields.forEach((field: any)=>{
      console.log(field)
      ret.push(this.parseStringToField(field));
    });
    return ret;
  }

  parseStringToField(field: any){
    return <Field>{
      field_id: field.field_id,
      name: field.name,
      short_name: field.short_name,
      start_year: field.start_year,
      cycle: field.cycle
    }
  }

  parseStringToFieldsSchedules(fs_json: any){
    let data = {};
    data["schedules"] = this.parseStringToSchedules({"schedules": fs_json.schedules});
    data["fields"] = this.parseStringToFields({"fields": fs_json.fields});
    return data;
  }

  parseStringToFieldsDetails(fd_json: any){
    let data = {};
    data["field"] = this.parseStringToField(fd_json.field);
    data["users"] = this.parseStringToUsers({"users": fd_json.users});
    data["requests"] = this.parseStringToUsers({"users": fd_json.requests});
    return data;
  }
}
