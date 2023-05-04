import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from '../redux/features/updateWorkspace';
import userReducer from '../redux/features/user';
// import tokenReducer from './features/token.reducer';

export const store = configureStore({
   reducer: {
      workspace: workspaceReducer,
      user: userReducer,
      // infoToken: tokenReducer,
   },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
