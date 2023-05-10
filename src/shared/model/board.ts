export interface IBoard {
   _id: string;
   name: string;
   workspace?: string;
   description?: string;
}

export interface IBoardsResponse<T> {
   boards: T;
}

export interface IBoardResponse<T> {
   board: T;
}
