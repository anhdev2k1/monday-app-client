export interface IBoard {
   _id: string;
   name: string;
   belongWorkspace?: string;
   description?: string;
   groups: [];
   columns: [];
}
export interface IBoardsResponse<T> {
   boards: T;
}

export interface IBoardResponse<T> {
   board: T;
}
