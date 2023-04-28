import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface workspaceState {
  name: string
}

const initialState: workspaceState = {
  name: 'Main workspace'
}

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    renameWorkspace: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { renameWorkspace } = workspaceSlice.actions

export default workspaceSlice.reducer