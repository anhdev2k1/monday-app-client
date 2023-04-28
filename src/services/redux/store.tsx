import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from "../redux/features/updateWorkspace"
import userReducer from "../redux/features/user"
export const store = configureStore({
   reducer: {
    workspace: workspaceReducer,
    user: userReducer
   },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
