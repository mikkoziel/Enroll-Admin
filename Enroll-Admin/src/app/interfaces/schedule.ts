import { Class } from './class';

export interface Schedule{
    id?: number,
    name: string,
    status: string,
    semester: number,
    description: string,
    classes: Class[]
}