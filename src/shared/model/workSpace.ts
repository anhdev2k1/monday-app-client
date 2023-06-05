import { IBoard } from './board';

export interface IWorkspace {
   _id?: string;
   name: string;
   description?: string;
   boards: IBoard[];
}

export interface IResponseWorkSpace<T> {
   message: string;
   status: string;
   statusCode: number;
   metadata?: T;
}
