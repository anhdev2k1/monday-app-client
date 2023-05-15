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
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';
import { ITypeItem } from '~/shared/model/listTypes';

const apiUrl = SERVER_API_URL;

interface IInitState {
   listTypes: {
      datas?: ITypeItem[];
      loading: boolean;
      error: boolean;
      status: string | number;
      mess: string;
   };
}

const initialState: IInitState = {
   listTypes: {
      datas: undefined,
      loading: false,
      error: false,
      status: '',
      mess: '',
   },
};

//  actions
export const getListTypes = createAsyncThunk(
   'get-list-types-slice',
   async () => {
      const requestUrl = `${apiUrl}v1/api/column/types`;
      return await axios.get<IResponseData<{ types: ITypeItem[] }>>(requestUrl);
   },
   { serializeError: serializeAxiosError },
);

export const listTypesSlice = createSlice({
   name: 'ListTypesSlice',
   initialState,
   extraReducers(builder) {
      builder
         .addMatcher(isFulfilled(getListTypes), (state, action) => {
            state.listTypes.datas = action.payload.data.metadata?.types;
            state.listTypes.mess = action.payload.data.message;
            state.listTypes.status = action.payload.data.status;
            state.listTypes.error = false;
         })
         .addMatcher(isPending(getListTypes), (state) => {
            state.listTypes.loading = true;
            state.listTypes.status = '';
            state.listTypes.mess = '';
            state.listTypes.error = false;
         })
         .addMatcher(isRejected(getListTypes), (state, action) => {
            state.listTypes.loading = false;
            state.listTypes.error = true;
            if (action?.error) {
               const { response } = action.error as { response: any };
               state.listTypes.status = response.data.statusCode;
               state.listTypes.mess = response.data.message;
            }
         });
   },
   reducers: {},
});

// Action creators are generated for each case reducer function

//  export const { resetCreateGroup, resetEditGroup } = groupSlice.actions;

export default listTypesSlice.reducer;
