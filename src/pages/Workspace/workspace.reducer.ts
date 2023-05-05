import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import { SERVER_API_URL } from '~/config/constants';
import axios from 'axios';
import { IResponseWorkSpace, IWorkspace } from '~/shared/model/workSpace';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';

export interface IInitWorkSpace {
   infoListWorkSpace: {
      data?: IWorkspace[];
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   currWorkspace: {
      data?: IWorkspace;
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   deleteWorkSpace: {
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
}

const baseUrl = SERVER_API_URL;
const initialState: IInitWorkSpace = {
   infoListWorkSpace: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   currWorkspace: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   deleteWorkSpace: {
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};

// interface Data
interface IUpdateWorkSpace extends IWorkspace {
   idWorkSpace: string;
}

interface IDetailWorkspace {
   idWorkSpace: string;
}

// actions

// edit
export const editWorkSpace = createAsyncThunk(
   'edit-workspace-slice',
   async (infoEditWorkSpace: Partial<IUpdateWorkSpace>) => {
      const { idWorkSpace, ...infoUpdate } = infoEditWorkSpace;
      const requestUrl = `${baseUrl}v1/api/workspace/${idWorkSpace}`;
      return await axios.patch<IResponseWorkSpace<IWorkspace>>(requestUrl, infoUpdate);
   },
   { serializeError: serializeAxiosError },
);

// get detail
export const getDetailWorkspace = createAsyncThunk(
   'get-detail-workspace-slice',
   async (idWorkSpace: IDetailWorkspace) => {
      const requestUrl = `${baseUrl}v1/api/workspace/${idWorkSpace.idWorkSpace}`;
      return await axios.get<IResponseWorkSpace<{
         workspace: IWorkspace
      }>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

// get detail
export const getListlWorkspace = createAsyncThunk(
   'get-list-workspace-slice',
   async () => {
      const requestUrl = `${baseUrl}v1/api/workspace`;
      return await axios.get<
         IResponseWorkSpace<{
            workspaces: IWorkspace[];
         }>
      >(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

// create
export const createWorkSpace = createAsyncThunk(
   'create-workspace-slice',
   async (infoCreate: IWorkspace) => {
      const requestUrl = `${baseUrl}v1/api/workspace`;
      return await axios.post<
         IResponseWorkSpace<{
            workspace: IWorkspace;
         }>
      >(requestUrl, infoCreate);
   },
   { serializeError: serializeAxiosError },
);

// delete

export const deleteWorkSpace = createAsyncThunk(
   'delete-workspace-slice',
   async (idWorkSpace: IDetailWorkspace) => {
      const requestUrl = `${baseUrl}v1/api/workspace/${idWorkSpace.idWorkSpace}`;
      return await axios.delete<IResponseWorkSpace<undefined>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

export const workspaceSlice = createSlice({
   name: 'WorkspaceSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(editWorkSpace), (state, action) => {
            state.currWorkspace.data = action.payload.data.metadata;
            state.currWorkspace.mess = action.payload.data.message;
            state.currWorkspace.status = action.payload.data.status;
            state.currWorkspace.error = false;
         })
         .addMatcher(isPending(editWorkSpace), (state) => {
            state.currWorkspace.loading = true;
            state.currWorkspace.status = '';
            state.currWorkspace.mess = '';
            state.currWorkspace.error = false;
         })
         .addMatcher(isRejected(editWorkSpace), (state, action) => {
            state.currWorkspace.loading = false;
            state.currWorkspace.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.currWorkspace.status = response.data.statusCode;
               state.currWorkspace.mess = response.data.message;
            }
         })
         .addMatcher(isFulfilled(getListlWorkspace), (state, action) => {
            state.infoListWorkSpace.data = action.payload.data.metadata?.workspaces;
            state.infoListWorkSpace.mess = action.payload.data.message;
            state.infoListWorkSpace.status = action.payload.data.status;
            state.infoListWorkSpace.error = false;
         })
         .addMatcher(isPending(getListlWorkspace), (state) => {
            state.infoListWorkSpace.loading = true;
            state.infoListWorkSpace.status = '';
            state.infoListWorkSpace.mess = '';
            state.infoListWorkSpace.error = false;
         })
         .addMatcher(isRejected(getListlWorkspace), (state, action) => {
            state.infoListWorkSpace.loading = false;
            state.infoListWorkSpace.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.infoListWorkSpace.status = response.data.statusCode;
               state.infoListWorkSpace.mess = response.data.message;
            }
         })
         .addMatcher(isFulfilled(createWorkSpace), (state, action) => {
            state.currWorkspace.data = action.payload.data.metadata?.workspace;
         })
         .addMatcher(isPending(createWorkSpace), (state) => {})
         .addMatcher(isRejected(createWorkSpace), (state, action) => {})
         .addMatcher(isFulfilled(getDetailWorkspace), (state, action) => {
            state.currWorkspace.data = action.payload.data.metadata?.workspace;
         });
   },
   reducers: {
      resetCurrWorkspace(state) {
         state.currWorkspace.loading = false;
         state.currWorkspace.data = undefined;
         state.currWorkspace.status = '';
         state.currWorkspace.mess = '';
         state.currWorkspace.error = false;
      },
   },
});

// Action creators are generated for each case reducer function
export const { resetCurrWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
