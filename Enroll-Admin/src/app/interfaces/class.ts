import { Group } from './group';

export interface Class{
    id?: number,
    name: String,
    full_name: String,
    groups: Group[],
    schedule_id?: number
}