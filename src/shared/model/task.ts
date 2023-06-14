import { IGroup } from "./group";

export interface IItemInListValueSelect {
  _id: string;
  value: string;
  color: string;
}
export interface IValueOfTask {
  belongColumn: string;
  typeOfValue: string;
  _id: string;
  value: string;
  valueId: IItemInListValueSelect | null;
}
export interface ITask {
  _id: string;
  name: string;
  position: number;
  values: IValueOfTask[];
  group: IGroup;
}
