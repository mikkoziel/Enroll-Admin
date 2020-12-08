import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Schedule } from '../interfaces/schedule';
import { Class } from '../interfaces/class';
import { Group } from '../interfaces/group';


const httpOptions = { headers: new HttpHeaders({ 
  'Content-Type' : 'application/json',
  'Access-Control-Allow-Origin':'*', 
}) };

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  httpAddress = "http://localhost:3999/enroll/admin";

  constructor(private http:HttpClient,) { 
  }

  getSchedules() {
    return this.http.get(this.httpAddress + "/schedules",
      {responseType: 'text'}).pipe(
        // tap(x=> console.log(x)),
        map(x=> this.parseSchedules(JSON.parse(x))),
        catchError(this.handleError('getSchedules'))
    )
  }

  parseSchedules(schedules: any){
    let ret: Schedule[] = [];
    schedules.schedules.forEach((schedule: any)=>{
      ret.push(this.parseSchedule(schedule));
    });
    return ret;
  }

  parseSchedule(schedule: any){
    return <Schedule>{
      id: schedule.scheduleID,
      name: schedule.name,
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
              professor: group.professor
            }
          )
            
      })
    };
  }

  getSchedule(id: number){
    return this.http.get(this.httpAddress + "/schedules/" + id.toString(),
    {responseType: 'text'}).pipe(
      // tap(x=> console.log(x)),
      map(x=> this.parseSchedule(JSON.parse(x))),
      catchError(this.handleError('getSchedules'))
    )
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
