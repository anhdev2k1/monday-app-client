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
import { IResponseData } from '~/shared/model/global';
import { IBoard } from '~/shared/model/board';

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
   deleteWorkspace: {
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   createBoard: {
      data?: IWorkspace[];
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
   deleteWorkspace: {
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   createBoard: {
      data: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   }
};

// interface Data
interface IUpdateWorkSpace extends IWorkspace {
   idWorkspace: string;
}

interface IDetailWorkspace {
   idWorkspace: string;
}
interface ICreateBoard {
   idWorkspace: string;
   name: string;
}
// actions

// edit
export const editWorkSpace = createAsyncThunk(
   'edit-workspace-slice',
   async (infoEditWorkSpace: Partial<IUpdateWorkSpace>) => {
      const { idWorkspace, ...infoUpdate } = infoEditWorkSpace;

      const requestUrl = `${baseUrl}v1/api/workspace/${idWorkspace}`;
      return await axios.patch<IResponseWorkSpace<IWorkspace>>(requestUrl, infoUpdate);
   },
   { serializeError: serializeAxiosError },
);

// get detail
export const getDetailWorkspace = createAsyncThunk(
   'get-detail-workspace-slice',
   async (idWorkSpace: IDetailWorkspace) => {
      const requestUrl = `${baseUrl}v1/api/workspace/${idWorkSpace.idWorkspace}`;
      return await axios.get<
         IResponseWorkSpace<{
            workspace: IWorkspace;
         }>
      >(requestUrl);
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

export const deleteWorkspace = createAsyncThunk(
   'delete-workspace-slice',
   async (idWorkspace: IDetailWorkspace) => {
      const requestUrl = `${baseUrl}v1/api/workspace/${idWorkspace.idWorkspace}`;
      return await axios.delete<IResponseWorkSpace<undefined>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);
export const createBoard = createAsyncThunk(
   'create-board-workspace-slice',
   async (bodyRequest: ICreateBoard) => {

      const requestUrl = `${baseUrl}v1/api/workspace/${bodyRequest.idWorkspace}/board`;
      return await axios.post<IResponseData<IBoard>>(requestUrl, {
         name: bodyRequest.name,
      });
   },
   { serializeError: serializeAxiosError },
);
export const workspaceSlice = createSlice({
   name: 'WorkspaceSlice',
   initialState,
   extraReducers(builder) {
      builder
         // .addMatcher(isFulfilled(editWorkSpace), (state, action) => {
         //    state.currWorkspace.data = action.payload.data.metadata;
         //    state.currWorkspace.mess = action.payload.data.message;
         //    state.currWorkspace.status = action.payload.data.status;
         //    state.currWorkspace.error = false;
         // })
         // .addMatcher(isPending(editWorkSpace), (state) => {
         //    state.currWorkspace.loading = true;
         //    state.currWorkspace.status = '';
         //    state.currWorkspace.mess = '';
         //    state.currWorkspace.error = false;
         // })
         // .addMatcher(isRejected(editWorkSpace), (state, action) => {
         //    state.currWorkspace.loading = false;
         //    state.currWorkspace.error = true;
         //    if (action?.error) {
         //       const { response } = action.error as { response: any };
         //       state.currWorkspace.status = response.data.statusCode;
         //       state.currWorkspace.mess = response.data.message;
         //    }
         // })
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

         .addMatcher(isFulfilled(getDetailWorkspace), (state, action) => {
            state.currWorkspace.data = action.payload.data.metadata?.workspace;

            state.currWorkspace.mess = action.payload.data.message;
            state.currWorkspace.status = action.payload.data.status;
            state.currWorkspace.error = false;
         })
         .addMatcher(isPending(getDetailWorkspace), (state) => {
            state.currWorkspace.loading = true;
            state.currWorkspace.status = '';
            state.currWorkspace.mess = '';
            state.currWorkspace.error = false;
         })
         .addMatcher(isRejected(getDetailWorkspace), (state, action) => {
            state.currWorkspace.loading = false;
            state.currWorkspace.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.currWorkspace.status = response.data.statusCode;
               state.currWorkspace.mess = response.data.message;
            }
         })
         .addMatcher(isFulfilled(createWorkSpace), (state, action) => {
            state.currWorkspace.data = action.payload.data.metadata?.workspace
            state.currWorkspace.mess = action.payload.data.message;
            state.currWorkspace.status = action.payload.data.status;
            state.currWorkspace.error = false;
         })
         .addMatcher(isFulfilled(createBoard), (state, action) => {
            // let listBoard = state.currWorkspace.data?.boards
            if (state.currWorkspace.data &&  action.payload.data.metadata) {
               state.currWorkspace.data.boards?.push( action.payload.data.metadata)
            }
         }).addMatcher(isPending(createBoard), (state) => {
            state.currWorkspace.loading = true;
            state.currWorkspace.status = '';
            state.currWorkspace.mess = '';
            state.currWorkspace.error = false;
         })
         .addMatcher(isRejected(createBoard), (state, action) => {
            state.currWorkspace.loading = false;
            state.currWorkspace.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.currWorkspace.status = response.data.statusCode;
               state.currWorkspace.mess = response.data.message;
            }
         })
   },
   reducers: {
      setNameWorkspace: (state, action) => {
         return {
            ...state,
            currWorkspace: {
               ...state.currWorkspace,
               data: {
                  ...state.currWorkspace.data,
                  name: action.payload,
               },
            },
         };
      },
      setDescriptionWorkspace: (state, action) => {
         // state.currWorkspace.data!.description = action.payload;
         if (state.currWorkspace.data) {
            state.currWorkspace.data!.description = action.payload;
            // return {
            //    ...state,
            //    currWorkspace: {
            //       ...state.currWorkspace,
            //       data: {
            //          ...state.currWorkspace.data,
            //          description: action.payload
            //       },
            //    },
            // };
         }
      },
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
export const { resetCurrWorkspace, setNameWorkspace, setDescriptionWorkspace } =
   workspaceSlice.actions;

export default workspaceSlice.reducer;
