import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IResponseUser } from '~/shared/model/authentication';

export interface userState {
   name: string;
   _id: string;
}

const initialState: userState = {
   name: '',
   _id: '',
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      currentUser: (state, action: PayloadAction<userState>) => {
         state._id = action.payload._id;
         state.name = action.payload.name;
      },
   },
});

// Action creators are generated for each case reducer function
export const { currentUser } = userSlice.actions;

export default userSlice.reducer;
