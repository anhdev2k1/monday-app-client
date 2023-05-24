import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IValueOfTask {
  values: {}
}

const initialState: IValueOfTask = {
    values: {}
}

export const workspaceSlice = createSlice({
  name: 'values',
  initialState,
  reducers: {
    renameWorkspace: (state, action: PayloadAction<string>) => {
      state.values = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { renameWorkspace } = workspaceSlice.actions

export default workspaceSlice.reducer