import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import { SERVER_API_URL } from '~/config/constants';
import { IUserWithToken, IResponseUser } from '../model/authentication';
import { serializeAxiosError } from './reducer.utils';
import axios from 'axios';
import { useAppDispatch } from '~/config/store';
import { setToken } from './token.reducer';

export interface IAuthen {
   login: {
      data?: IUserWithToken;
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   register: {
      data?: IUserWithToken;
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
}

const baseUrl = SERVER_API_URL;
const initialState: IAuthen = {
   login: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   register: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};

// data create

export interface IDataLogin {
   email: string;
   password: string;
}

export interface IDataRegister {
   email: string;
   password: string;
   name: string;
}
// actions

export const loginAccount = createAsyncThunk(
   'login-slice',
   async (infoLogin: IDataLogin) => {
      const requestUrl = `${baseUrl}v1/api/auth/signin`;
      return await axios.post<IResponseUser>(requestUrl, infoLogin);
   },
   { serializeError: serializeAxiosError },
);

export const registerAccount = createAsyncThunk(
   'register-slice',
   async (infoRegister: IDataRegister) => {
      const requestUrl = `${baseUrl}v1/api/auth/signup`;
      return await axios.post<IResponseUser>(requestUrl, infoRegister);
   },
   { serializeError: serializeAxiosError },
);

export const userSlice = createSlice({
   name: 'UserSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(loginAccount), (state, action) => {
            state.login.data = action.payload.data.metadata;
            state.login.mess = action.payload.data.message;
            state.login.error = false;
            localStorage.setItem('token', JSON.stringify(action.payload.data.metadata.accessToken));
            // console.log(action.payload.data.metadata);
            // console.log(action.payload.data.metadata.user);
            // console.log(action.payload.data.metadata.user.useProfile);
            localStorage.setItem(
               'userName',
               JSON.stringify(action.payload.data.metadata.user.userProfile.name),
            );
            localStorage.setItem('userId', JSON.stringify(action.payload.data.metadata.user._id));
         })
         .addMatcher(isPending(loginAccount), (state) => {
            state.login.loading = true;
            state.login.status = '';
            state.login.mess = '';
            state.login.error = false;
         })
         .addMatcher(isRejected(loginAccount), (state, action) => {
            state.login.loading = false;
            state.login.error = true;

            if (action?.error) {
               const { response } = action.error as { response: any };
               state.login.status = response.data.statusCode;
               state.login.mess = response.data.message;
            }
         })
         .addMatcher(isFulfilled(registerAccount), (state, action) => {
            state.register.data = action.payload.data.metadata;
            state.register.mess = action.payload.data.message;
            state.register.error = false;
            localStorage.setItem('token', JSON.stringify(action.payload.data.metadata.accessToken));
            localStorage.setItem(
               'userName',
               JSON.stringify(action.payload.data.metadata.user.userProfile.name),
            );
            localStorage.setItem('userId', JSON.stringify(action.payload.data.metadata.user._id));
         })
         .addMatcher(isPending(registerAccount), (state) => {
            state.register.loading = true;
            state.register.status = '';
            state.register.mess = '';
            state.register.error = false;
         })
         .addMatcher(isRejected(registerAccount), (state, action) => {
            state.register.loading = false;
            state.register.error = true;

            if (action?.error) {
               const { response } = action.error as { response: any };
               state.register.status = response.data.statusCode;
               state.register.mess = response.data.message;
            }
         });
   },
   reducers: {
      resetLogin(state) {
         state.login.loading = false;
         state.login.data = undefined;
         state.login.status = '';
         state.login.mess = '';
         state.login.error = false;
      },
   },
});

// Action creators are generated for each case reducer function
export const { resetLogin } = userSlice.actions;

export default userSlice.reducer;
