export interface IGroup {
   _id: string;
   position: number;
   belongBoard: string;
   name: string;
   tasks: {
      _id: string;
      name: string;
      position: number;
   }[];
}
