import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  _id?: string;
}

export interface userState {
  user: User
}

const initialState: userState = {
  user: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currentUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { currentUser } = userSlice.actions

export default userSlice.reducer