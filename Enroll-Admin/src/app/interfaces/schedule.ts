import { Class } from './class';

export interface Schedule{
    id: number,
    name: string,
    status?: number,
    semester?: number,
    description?: string,
    classes: Class[]
}