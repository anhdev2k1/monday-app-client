export interface IItemInListValueSelect {
   _id: string;
   value: string | null;
   color: string | null;
}
export interface IValueOfTask {
   belongColumn: string;
   typeOfValue: string;
   _id: string;
   value: string;
   valueId: IItemInListValueSelect;
   name: string;
}
export interface ITask {
   _id: string;
   name: string;
   position: number;
   values: IValueOfTask[];
}
