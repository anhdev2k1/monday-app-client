export interface IResponseRegister {
   user: {
      _id: string;
      email: string;
      name: string;
   };
   accessToken: string;
}
