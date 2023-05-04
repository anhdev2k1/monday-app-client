import boardSlice from '~/pages/Board/board.reducer';
import tokenSlice from '~/shared/reducers/token.reducer';
import userSlice from './user.reducer';
import workspaceSlice from '~/pages/Workspace/workspace.reducer';

const rootReducer = {
   boardSlice,
   tokenSlice,
   userSlice,
   workspaceSlice,
};

export default rootReducer;
