import { IGroup } from './group';

// export interface IColumn extends IGroup {

// }

export interface IColumn {
   _id: string;
   name: string;
   position: number;
   belongType: {
      _id: string;
      name: string;
      icon: string;
      color: string;
   };
}
