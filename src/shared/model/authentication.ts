export interface IResponseUser {
   user: {
      _id: string;
      email: string;
      name: string;
   };
   accessToken: string;
}
