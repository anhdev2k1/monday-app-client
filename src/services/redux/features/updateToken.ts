import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface workspaceState {
   token: string;
}

let token = localStorage.getItem('token');
if (token) {
   token = JSON.parse(token);
}
const initialState: workspaceState = {
   token: token || '',
};

export const tokenSlice = createSlice({
   name: 'infoToken',
   initialState,
   reducers: {
      setToken: (state, action: PayloadAction<string>) => {
         state.token = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
