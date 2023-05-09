import {
   createAsyncThunk,
   createSlice,
   isFulfilled,
   isPending,
   isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_API_URL } from '~/config/constants';
import { IBoard, IBoardResponse, IBoardsResponse } from '~/shared/model/board';
import { IResponseData } from '~/shared/model/global';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
   listBoard: {
      datas?: IBoard[];
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
   currBoard: {
      data?: IBoard;
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
}

const initialState: IInitState = {
   listBoard: {
      datas: [],
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
   currBoard: {
      data: {
         _id: '64534d69fd2f03a9517deb95',
         workspace: '645329765a9adf79b0dde47y',
         name: 'Monday',
      },
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};

// body request

interface IParamsRequest {
   id: string;
}

interface ICreateBoard {
   idWorkspace: string;
   name: string;
}
interface IEditBoard {
   idBoard: string;
   name: string;
   description?: string;
}

// actions
// Get all board
export const getListBoards = createAsyncThunk(
   'get-list-boards-slice',
   async (params: IParamsRequest) => {
      const requestUrl = `${apiUrl}v1/api/workspace/${params.id}/board`;
      return await axios.get<IResponseData<IBoardsResponse<IBoard[]>>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

// Get detail board
export const getBoardDetail = createAsyncThunk(
   'get-board-detail-slice',
   async (params: IParamsRequest) => {
      const requestUrl = `${apiUrl}v1/api/board/${params.id}`;
      return await axios.get<IResponseData<IBoardResponse<IBoard>>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

// Create  board

export const createBoard = createAsyncThunk(
   'create-board-slice',
   async (bodyRequest: ICreateBoard) => {
      console.log(bodyRequest);

      const requestUrl = `${apiUrl}v1/api/workspace/${bodyRequest.idWorkspace}/board`;
      return await axios.post<IResponseData<IBoard>>(requestUrl, {
         name: bodyRequest.name,
      });
   },
   { serializeError: serializeAxiosError },
);
// Edit board
export const editBoard = createAsyncThunk(
   'edit-board-slice',
   async (bodyRequest: IEditBoard) => {
      const { idBoard, ...rest } = bodyRequest;
      const requestUrl = `${apiUrl}v1/api/board/${idBoard}`;
      return await axios.patch<IResponseData<IBoard>>(requestUrl, rest);
   },
   { serializeError: serializeAxiosError },
);

// Delete board
export const deleteBoard = createAsyncThunk(
   'delete-board-slice',
   async (params: IParamsRequest) => {
      const { id } = params;
      const requestUrl = `${apiUrl}v1/api/board/${id}`;
      return await axios.delete<IResponseData<undefined>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

const boardSlice = createSlice({
   name: 'BoardSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(getListBoards), (state, action) => {
            state.listBoard.datas = action.payload.data.metadata?.boards;
            state.listBoard.error = false;
            state.listBoard.loading = false;
            state.listBoard.status = action.payload.data.status;
            state.listBoard.mess = action.payload.data.message;
         })
         .addMatcher(isPending(getListBoards), (state, action) => {
            state.listBoard.loading = true;
         })
         .addMatcher(isRejected(getListBoards), (state, action) => {
            state.listBoard.error = true;
            state.listBoard.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.listBoard.status = response.status;
               state.listBoard.mess = response.message;
            }
         })
         .addMatcher(isFulfilled(getBoardDetail), (state, action) => {
            state.currBoard.data = action.payload.data.metadata?.board;
            state.listBoard.error = false;
            state.listBoard.loading = false;
            state.listBoard.status = action.payload.data.status;
            state.listBoard.mess = action.payload.data.message;
         })
         .addMatcher(isPending(getBoardDetail), (state, action) => {
            state.listBoard.loading = true;
         })
         .addMatcher(isRejected(getBoardDetail), (state, action) => {
            state.listBoard.error = true;
            state.listBoard.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.listBoard.status = response.status;
               state.listBoard.mess = response.message;
            }
         })
         .addMatcher(isFulfilled(createBoard), (state, action) => {
            state.currBoard.data = action.payload.data.metadata;
            const newBoard = action.payload.data.metadata;
            if (newBoard && state.listBoard.datas) {
               state.listBoard.datas.push(newBoard);
            }
            state.currBoard.error = false;
            state.currBoard.loading = false;
            state.currBoard.status = action.payload.data.status;
            state.currBoard.mess = action.payload.data.message;
         })
         .addMatcher(isPending(getBoardDetail), (state, action) => {
            state.currBoard.loading = true;
         })
         .addMatcher(isRejected(getBoardDetail), (state, action) => {
            state.currBoard.error = true;
            state.currBoard.loading = false;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.currBoard.status = response.status;
               state.currBoard.mess = response.message;
            }
         });
      // .addMatcher(isFulfilled(editBoard), (state, action) => {
      //    state.currBoard.data = action.payload.data.metadata;
      //    state.currBoard.error = false;
      //    state.currBoard.loading = false;
      //    state.currBoard.status = action.payload.data.status;
      //    state.currBoard.mess = action.payload.data.message;
      // })
      // .addMatcher(isPending(editBoard), (state, action) => {
      //    state.currBoard.loading = true;
      // })
      // .addMatcher(isRejected(editBoard), (state, action) => {
      //    state.currBoard.error = true;
      //    state.currBoard.loading = false;
      //    if (action?.error) {
      //       const { response } = action.error as { response: any };
      //       state.currBoard.status = response.status;
      //       state.currBoard.mess = response.message;
      //    }
      // })
      // .addMatcher(isFulfilled(deleteBoard), (state, action) => {
      //    state.currBoard.data = action.payload.data.metadata;
      //    state.currBoard.error = false;
      //    state.currBoard.loading = false;
      //    state.currBoard.status = action.payload.data.status;
      //    state.currBoard.mess = action.payload.data.message;
      // })
      // .addMatcher(isPending(deleteBoard), (state, action) => {
      //    state.currBoard.loading = true;
      // })
      // .addMatcher(isRejected(deleteBoard), (state, action) => {
      //    state.currBoard.error = true;
      //    state.currBoard.loading = false;
      //    if (action?.error) {
      //       const { response } = action.error as { response: any };
      //       state.currBoard.status = response.status;
      //       state.currBoard.mess = response.message;
      //    }
      // });
   },
   reducers: {
      resetCurrBoard(state) {
         state.currBoard = {
            data: undefined,
            loading: false,
            error: false,
            status: '',
            mess: '',
         };
      },
   },
});

export const { resetCurrBoard } = boardSlice.actions;

export default boardSlice.reducer;
