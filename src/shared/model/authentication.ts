export interface IUserWithToken {
   user: IUser;
   accessToken: string;
}

export interface IUser {
   _id: string;
   email: string;
   userProfile: IUserProfile;
}

export interface IUserProfile {
   _id: string;
   name: string;
}

export interface IResponseUser {
   message: string;
   status: string;
   statusCode: number;
   metadata: IUserWithToken;
}
