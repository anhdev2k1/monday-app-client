import { IGroup } from './group';

// export interface IColumn extends IGroup {}

export interface IDefaultValue {
   _id: string;
   value: string;
   color: string;
}

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
   defaultValues: IDefaultValue[];
}

export interface ICreateCol {
   column: IColumn;
   defaultValues: IDefaultValue[];
   tasksColumnsIds: string[];
}
