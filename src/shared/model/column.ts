import { IGroup } from './group';

// export interface IColumn extends IGroup {

// }

export interface IColumn {
   _id: string;
   name: string;
   position: number;
   belongType: string;
}
