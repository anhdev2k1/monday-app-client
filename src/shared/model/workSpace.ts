export interface IWorkspace {
   _id?: string;
   name: string;
   description?: string;
}

export interface IResponseWorkSpace<T> {
   message: string;
   status: string;
   statusCode: number;
   metadata?: T;
}  
