import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../interfaces/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedulesObservable: Observable<Schedule[]>;

  constructor() { 
    this.schedulesObservable = of([
      <Schedule>{
      id:0,
      }
    ]);
  }

  getSchedules(): Observable<Schedule[]> {
    return this.schedulesObservable;
  }

  addSchedule(schedule: Schedule): void {
    this.schedulesObservable.pipe(
      map(arr=>{
        arr.push(schedule);
      })
    )
  }
}
