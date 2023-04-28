import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from '../redux/features/updateWorkspace';
import tokenReducer from './features/updateToken';
export const store = configureStore({
   reducer: {
      workspace: workspaceReducer,
      infoToken: tokenReducer,
   },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
