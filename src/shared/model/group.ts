import { ITask } from './task';

export interface IGroup {
   _id: string;
   position: number;
   belongBoard: string;
   name: string;
   tasks: ITask[];
}
