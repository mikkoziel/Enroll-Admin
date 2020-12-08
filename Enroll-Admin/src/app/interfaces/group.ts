import { Time } from '@angular/common';

export interface Group{
    id: number,
    day: number,
    start: Time,
    end: Time,
    professor: String
}