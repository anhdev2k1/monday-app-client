// export interface IColumn extends IGroup {}

import { IValueOfTask } from './task';

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
   tasksColumns: IValueOfTask[];
}
