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
   createGroup: {
      data?: IGroup;
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   editGroup: {
      data?: IGroup;
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   deleteGroup: {
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
}

const initialState: IInitState = {
   createGroup: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   editGroup: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   deleteGroup: {
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};
interface IParamsRequest {
   idGroup: string;
   idBoard: string;
}

interface ICreateGroup {
   idBoard: string;
   name: string;
   position: number;
}
interface IEditGroup {
   idGroup: string;
   name: string;
   position?: number;
}

export const createGroup = createAsyncThunk(
   'create-group-slice',
   async (bodyRequest: ICreateGroup) => {
      const requestUrl = `${apiUrl}v1/api/board/${bodyRequest.idBoard}/group`;
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
      const requestUrl = `${apiUrl}v1/api/group/${bodyRequest.idGroup}`;
      return await axios.patch<
         IResponseData<{
            group: IGroup;
         }>
      >(requestUrl, rest);
   },
   { serializeError: serializeAxiosError },
);
export const deleteGroup = createAsyncThunk(
   'delete-group-slice',
   async (params: IParamsRequest) => {
      const { idBoard, idGroup } = params;
      const requestUrl = `${apiUrl}v1/api/board/${idBoard}/group/${idGroup}`;
      return await axios.delete<IResponseData<undefined>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

export const groupSlice = createSlice({
   name: 'WorkspaceSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(createGroup), (state, action) => {
            state.createGroup.data = action.payload.data.metadata?.group;
            state.createGroup.mess = action.payload.data.message;
            state.createGroup.status = action.payload.data.status;
            state.createGroup.error = false;
         })
         .addMatcher(isPending(createGroup), (state) => {
            state.createGroup.loading = true;
            state.createGroup.status = '';
            state.createGroup.mess = '';
            state.createGroup.error = false;
         })
         .addMatcher(isRejected(createGroup), (state, action) => {
            state.createGroup.loading = false;
            state.createGroup.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.createGroup.status = response.data.statusCode;
               state.createGroup.mess = response.data.message;
            }
         })
         .addMatcher(isFulfilled(updateGroup), (state, action) => {
            state.editGroup.data = action.payload.data.metadata?.group;
            state.editGroup.mess = action.payload.data.message;
            state.editGroup.status = action.payload.data.status;
            state.editGroup.error = false;
         })
         .addMatcher(isPending(updateGroup), (state) => {
            state.editGroup.loading = true;
            state.editGroup.status = '';
            state.editGroup.mess = '';
            state.editGroup.error = false;
         })
         .addMatcher(isRejected(updateGroup), (state, action) => {
            state.editGroup.loading = false;
            state.editGroup.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.editGroup.status = response.data.statusCode;
               state.editGroup.mess = response.data.message;
            }
         })
         .addMatcher(isFulfilled(deleteGroup), (state, action) => {
            state.deleteGroup.mess = action.payload.data.message;
            state.deleteGroup.status = action.payload.data.status;
            state.deleteGroup.error = false;
         })
         .addMatcher(isPending(deleteGroup), (state) => {
            state.deleteGroup.loading = true;
            state.deleteGroup.status = '';
            state.deleteGroup.mess = '';
            state.deleteGroup.error = false;
         })
         .addMatcher(isRejected(deleteGroup), (state, action) => {
            state.deleteGroup.loading = false;
            state.deleteGroup.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.deleteGroup.status = response.data.statusCode;
               state.deleteGroup.mess = response.data.message;
            }
         });
   },
   reducers: {
      resetCreateGroup(state) {
         state.createGroup.loading = false;
         state.createGroup.data = undefined;
         state.createGroup.status = '';
         state.createGroup.mess = '';
         state.createGroup.error = false;
      },
      resetEditGroup(state) {
         state.createGroup.loading = false;
         state.createGroup.data = undefined;
         state.createGroup.status = '';
         state.createGroup.mess = '';
         state.createGroup.error = false;
      },
   },
});

// Action creators are generated for each case reducer function

export const { resetCreateGroup, resetEditGroup } = groupSlice.actions;

export default groupSlice.reducer;
