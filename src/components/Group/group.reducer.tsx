import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IResponseData } from '~/shared/model/global';
import { IGroup } from '~/shared/model/group';
import { IBoard } from '../../shared/model/board';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';

const apiUrl = SERVER_API_URL;

interface IInitState {
   currBoard: {
      data?: IBoard;
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
}

const initialState: IInitState = {
   currBoard: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};
interface IParamsRequest {
   id: string;
}

interface ICreateGroup {
   idBoard: string;
   name: string;
   position: number;
}
interface IEditGroup {
   idGroup: string;
   name: string;
   position: number;
}

export const createGroup = createAsyncThunk(
   'create-group-slice',
   async (bodyRequest: ICreateGroup) => {
      const requestUrl = `${apiUrl}v1/api/workspace/${bodyRequest.idBoard}/group`;
      return await axios.post<IResponseData<{ group: IGroup }>>(requestUrl, {
         name: bodyRequest.name,
         position: bodyRequest.position,
      });
   },
   { serializeError: serializeAxiosError },
);

export const updateGroup = createAsyncThunk(
   'edit-board-slice',
   async (bodyRequest: IEditGroup) => {
      const { idGroup, ...rest } = bodyRequest;
      const requestUrl = `${apiUrl}v1/api/board/${idGroup}`;
      return await axios.patch<IResponseData<IGroup>>(requestUrl, rest);
   },
   { serializeError: serializeAxiosError },
);
export const deleteGroup = createAsyncThunk(
   'delete-group-slice',
   async (params: IParamsRequest) => {
      const { id } = params;
      const requestUrl = `${apiUrl}v1/api/board/${id}`;
      return await axios.delete<IResponseData<undefined>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);


