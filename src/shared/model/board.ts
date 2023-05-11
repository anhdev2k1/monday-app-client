export interface IBoard {
   _id: string;
   name: string;
   belongWorkspace?: string;
   description?: string;
   group?: [];
   columns?: [];
}
export interface IBoardsResponse<T> {
   boards: T;
}

export interface IBoardResponse<T> {
   board: T;
}
