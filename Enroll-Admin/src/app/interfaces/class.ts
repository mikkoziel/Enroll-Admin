import { Group } from './group';

export interface Class{
    id?: number,
    name: String,
    groups: Group[],
    schedule_id?: number
}