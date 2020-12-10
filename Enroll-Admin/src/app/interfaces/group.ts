import { Time, WeekDay } from '@angular/common';

export interface Group{
    id?: number,
    day: number,
    start: Time,
    end: Time,
    professor_id?: number
    class_id?: number
}